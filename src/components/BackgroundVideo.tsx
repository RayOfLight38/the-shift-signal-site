import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/heartbeat";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";

const FADE_MS = 500;
const FADE_OUT_LEAD_S = 0.55;

/**
 * Full-bleed atmosphere video.
 * - The video is reference atmosphere only; heavy overlays + the vignette in
 *   Hero keep the pulsing heart as the focal point.
 * - Fades are driven by requestAnimationFrame (not CSS transitions), resume
 *   from current opacity, and cancel any in-flight frame before starting.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);
  const opacityRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cancelFade = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const fadeTo = (target: number, onDone?: () => void) => {
      cancelFade(); // each new fade cancels any running frame
      const start = opacityRef.current; // resume from current opacity, no snap
      const delta = target - start;
      if (delta === 0) {
        onDone?.();
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / FADE_MS, 1);
        opacityRef.current = start + delta * p;
        video.style.opacity = String(opacityRef.current);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          onDone?.();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onCanPlay = () => {
      fadingOutRef.current = false;
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (fadingOutRef.current) return; // guard against retrigger
      if (
        video.duration &&
        video.duration - video.currentTime <= FADE_OUT_LEAD_S
      ) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      cancelFade();
      opacityRef.current = 0;
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.style.opacity = "0";
    video.addEventListener("canplay", onCanPlay, { once: true });
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    void video.play().catch(() => {
      /* autoplay blocked: the gradient fallback below carries the scene */
    });

    return () => {
      cancelFade();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Fallback scene if the video never loads or autoplay is blocked */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(63,94,94,0.35) 0%, rgba(31,29,27,0.9) 60%, #0d0c0b 100%)",
        }}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover translate-y-[17%] scale-110 blur-[2px] saturate-[0.8]"
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          preload="auto"
          style={{ opacity: 0 }}
          tabIndex={-1}
        />
      )}
      {/* Mask the subject in the source footage; the heart owns the frame */}
      <div className="absolute inset-0 bg-charcoal/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 52% at 50% 48%, rgba(13,12,11,0.78) 0%, rgba(13,12,11,0.35) 55%, transparent 100%)",
        }}
      />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
