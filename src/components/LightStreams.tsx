import { useRef } from "react";
import { useHeartbeat } from "../lib/heartbeat";

/**
 * Four liquid-light streams firing from the heart to the category cards.
 * Coordinates live in a 0–100 viewBox stretched over the hero
 * (preserveAspectRatio="none"); non-scaling strokes keep the light crisp.
 *
 * Endpoints match the CSS anchor positions of the four cards in Hero.tsx.
 * On every heartbeat a comet (dash) travels the path via the Web Animations
 * API; the cards glow on arrival using the same shared clock.
 */

export const STREAM_TRAVEL_MS = 650;

// gently curved, slightly organic paths: center -> card anchors
const STREAMS = [
  { id: "ul", d: "M50,50 C42,44 32,40 26,34 C22,30 19.5,27 18,24" }, // upper left
  { id: "ur", d: "M50,50 C58,44 68,40 74,34 C78,30 80.5,27 82,24" }, // upper right
  { id: "ll", d: "M50,50 C43,57 33,60 26,66 C22,69.5 19.5,73 18,76" }, // lower left
  { id: "lr", d: "M50,50 C57,57 67,60 74,66 C78,69.5 80.5,73 82,76" }, // lower right
];

export default function LightStreams({ className = "" }: { className?: string }) {
  const cometRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowRefs = useRef<(SVGPathElement | null)[]>([]);

  const { reducedMotion } = useHeartbeat((strength) => {
    STREAMS.forEach((_, i) => {
      const comet = cometRefs.current[i];
      const glow = glowRefs.current[i];
      if (comet) {
        comet.animate(
          [
            { strokeDashoffset: 14, opacity: 0.9 * strength },
            { strokeDashoffset: -100, opacity: 0.55 * strength },
          ],
          { duration: STREAM_TRAVEL_MS, easing: "cubic-bezier(0.3, 0, 0.5, 1)" }
        );
      }
      if (glow) {
        glow.animate(
          [
            { opacity: 0.28 },
            { opacity: 0.28 + 0.5 * strength, offset: 0.25 },
            { opacity: 0.28 },
          ],
          { duration: 900, easing: "ease-out" }
        );
      }
    });
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9ff0ff" />
          <stop offset="55%" stopColor="#3dd9ff" />
          <stop offset="100%" stopColor="#3f8e8e" />
        </linearGradient>
        <filter id="streamBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {STREAMS.map((s, i) => (
        <g key={s.id}>
          {/* soft amber under-glow */}
          <path
            d={s.d}
            stroke="#D88B3A"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.1"
            filter="url(#streamBlur)"
            vectorEffect="non-scaling-stroke"
          />
          {/* main cyan glow body */}
          <path
            ref={(el) => {
              glowRefs.current[i] = el;
            }}
            d={s.d}
            stroke="url(#streamGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity={reducedMotion ? 0.35 : 0.28}
            filter="url(#streamBlur)"
            vectorEffect="non-scaling-stroke"
          />
          {/* crisp core line */}
          <path
            d={s.d}
            stroke="#bdeffc"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* flowing particles */}
          {!reducedMotion && (
            <path
              d={s.d}
              pathLength={100}
              className="stream-dashes"
              stroke="#e6fbff"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {/* beat comet */}
          {!reducedMotion && (
            <path
              ref={(el) => {
                cometRefs.current[i] = el;
              }}
              d={s.d}
              pathLength={100}
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="14 100"
              strokeDashoffset="14"
              opacity="0"
              filter="url(#streamBlur)"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
