import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/**
 * One shared heartbeat clock for the whole hero.
 *
 * Rhythm (lub-dub):
 *   t = 0ms      -> strong beat   (strength 1)
 *   t = 380ms    -> echo beat     (strength 0.55)
 *   rest until cycle end
 *   cycle length -> 1700ms, repeat
 *
 * Consumers register a listener and receive (strength) on every beat.
 * The heart scale, inner glow, EKG flash, stream bursts, and card glows
 * all subscribe to this single clock so everything pulses together.
 */

export type BeatListener = (strength: number) => void;

interface HeartbeatContextValue {
  subscribe: (fn: BeatListener) => () => void;
  reducedMotion: boolean;
}

const HeartbeatContext = createContext<HeartbeatContextValue>({
  subscribe: () => () => {},
  reducedMotion: false,
});

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

const CYCLE_MS = 1700;
const ECHO_DELAY_MS = 380;
const ECHO_STRENGTH = 0.55;

export function HeartbeatProvider({ children }: { children: ReactNode }) {
  const listenersRef = useRef<Set<BeatListener>>(new Set());
  const reducedMotion = useReducedMotion();

  const subscribe = useCallback((fn: BeatListener) => {
    listenersRef.current.add(fn);
    return () => {
      listenersRef.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // calm: no beats at all

    let cancelled = false;
    const timers: number[] = [];

    const emit = (strength: number) => {
      if (cancelled) return;
      listenersRef.current.forEach((fn) => fn(strength));
    };

    const cycle = () => {
      if (cancelled) return;
      emit(1);
      timers.push(window.setTimeout(() => emit(ECHO_STRENGTH), ECHO_DELAY_MS));
      timers.push(window.setTimeout(cycle, CYCLE_MS));
    };

    // small lead-in so the page settles before the first beat
    timers.push(window.setTimeout(cycle, 600));

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reducedMotion]);

  return (
    <HeartbeatContext.Provider value={{ subscribe, reducedMotion }}>
      {children}
    </HeartbeatContext.Provider>
  );
}

/** Subscribe to the heartbeat. Callback fires on every beat with its strength. */
export function useHeartbeat(onBeat?: BeatListener) {
  const { subscribe, reducedMotion } = useContext(HeartbeatContext);
  const cbRef = useRef<BeatListener | undefined>(onBeat);
  cbRef.current = onBeat;

  useEffect(() => {
    if (!cbRef.current) return;
    return subscribe((s) => cbRef.current?.(s));
  }, [subscribe]);

  return { reducedMotion };
}
