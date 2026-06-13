import { useRef } from "react";
import { useHeartbeat } from "../lib/heartbeat";

/**
 * The heart from the logo, rebuilt as a living SVG:
 *  - faceted translucent glass body
 *  - electric cyan core that brightens on each beat
 *  - muted burgundy vessels (aorta, pulmonary trunk, appendages) up top
 *  - thin coronary veins laid over the glass
 *  - an EKG trace crossing the center, flashing with the pulse
 * Badge, banner, and lettering from the logo are intentionally ignored.
 */
export default function PulsingHeart({ className = "" }: { className?: string }) {
  const groupRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const spikeRef = useRef<SVGGElement>(null);

  const { reducedMotion } = useHeartbeat((strength) => {
    const g = groupRef.current;
    const core = coreRef.current;
    const spike = spikeRef.current;
    if (!g || !core || !spike) return;

    // contract: quick out, slow release
    const scale = 1 + 0.045 * strength;
    g.style.transition = "transform 0.16s cubic-bezier(0.3, 1.4, 0.5, 1)";
    g.style.transform = `scale(${scale})`;
    core.style.transition = "opacity 0.12s ease-out";
    core.style.opacity = String(0.65 + 0.35 * strength);
    spike.style.transition = "opacity 0.08s ease-out";
    spike.style.opacity = "1";

    window.setTimeout(() => {
      g.style.transition = "transform 0.55s cubic-bezier(0.25, 0.6, 0.35, 1)";
      g.style.transform = "scale(1)";
      core.style.transition = "opacity 0.6s ease-in";
      core.style.opacity = "0.65";
      spike.style.transition = "opacity 0.5s ease-in";
      spike.style.opacity = "0.45";
    }, 170);
  });

  return (
    <svg
      viewBox="0 0 400 440"
      className={className}
      role="img"
      aria-label="A translucent glass anatomical heart glowing cyan, with an EKG pulse line crossing its center"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#9ff0ff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#3dd9ff" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#1572d6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0a3a78" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#dfeef2" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#bfe9f2" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="vesselGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a04a56" />
          <stop offset="100%" stopColor="#6e2430" />
        </linearGradient>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bigBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <clipPath id="heartClip">
          <path d="M150,130 C108,142 86,184 92,234 C98,294 138,352 188,400 C226,372 292,312 306,248 C316,202 300,158 262,142 C240,132 222,136 206,148 C190,134 168,126 150,130 Z" />
        </clipPath>
      </defs>

      {/* ambient halo behind everything */}
      <ellipse cx="200" cy="265" rx="150" ry="160" fill="url(#coreGlow)" opacity="0.25" filter="url(#bigBlur)" />

      <g ref={groupRef} style={{ transformOrigin: "200px 265px" }}>
        {/* ---- vessels (organic burgundy top, like the logo) ---- */}
        <g>
          {/* vena cava (left vertical) */}
          <path d="M152,148 C146,118 148,96 156,78" stroke="url(#vesselGrad)" strokeWidth="24" strokeLinecap="round" fill="none" opacity="0.92" />
          {/* aortic arch */}
          <path d="M198,158 C192,104 222,70 254,74 C286,78 296,106 286,136" stroke="url(#vesselGrad)" strokeWidth="24" strokeLinecap="round" fill="none" />
          {/* arch branches */}
          <path d="M224,88 L219,62" stroke="url(#vesselGrad)" strokeWidth="13" strokeLinecap="round" />
          <path d="M252,76 L252,48" stroke="url(#vesselGrad)" strokeWidth="13" strokeLinecap="round" />
          <path d="M280,86 L288,62" stroke="url(#vesselGrad)" strokeWidth="13" strokeLinecap="round" />
          {/* pulmonary trunk crossing right */}
          <path d="M224,160 C246,146 274,142 296,150" stroke="url(#vesselGrad)" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.9" />
          {/* arch shading */}
          <path d="M202,152 C198,108 222,82 250,84" stroke="#5a1d27" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>

        {/* atrial appendages */}
        <ellipse cx="126" cy="192" rx="32" ry="26" fill="url(#vesselGrad)" opacity="0.85" transform="rotate(-18 126 192)" />
        <ellipse cx="272" cy="198" rx="27" ry="22" fill="url(#vesselGrad)" opacity="0.85" transform="rotate(14 284 200)" />

        {/* ---- glass body ---- */}
        <path
          d="M150,130 C108,142 86,184 92,234 C98,294 138,352 188,400 C226,372 292,312 306,248 C316,202 300,158 262,142 C240,132 222,136 206,148 C190,134 168,126 150,130 Z"
          fill="url(#glassGrad)"
          stroke="#e9f7fb"
          strokeOpacity="0.55"
          strokeWidth="2.5"
        />

        {/* cyan core, clipped inside the glass */}
        <g ref={coreRef} style={{ opacity: 0.65 }} clipPath="url(#heartClip)">
          <ellipse cx="202" cy="295" rx="100" ry="115" fill="url(#coreGlow)" />
          <ellipse cx="202" cy="290" rx="60" ry="70" fill="url(#coreGlow)" opacity="0.9" filter="url(#bigBlur)" />
        </g>

        {/* glass facets */}
        <g clipPath="url(#heartClip)" stroke="#ffffff" strokeWidth="1.1" fill="none" className="heart-shimmer">
          <path d="M92,228 L150,206 L208,236 L262,206 L305,242" strokeOpacity="0.16" />
          <path d="M118,300 L172,272 L196,318 L252,284 L296,300" strokeOpacity="0.13" />
          <path d="M150,206 L138,150 M208,236 L206,150 M262,206 L264,146" strokeOpacity="0.12" />
          <path d="M150,206 L118,300 M208,236 L196,318 M262,206 L296,300" strokeOpacity="0.12" />
          <path d="M140,358 L196,318 L246,352 L196,402" strokeOpacity="0.14" />
        </g>

        {/* rim light, upper-left glass edge */}
        <path
          d="M150,134 C116,144 96,180 96,224"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="heart-shimmer"
        />

        {/* coronary veins over the glass */}
        <g stroke="#8B2D3A" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M214,166 C220,214 204,252 214,300 C218,326 212,352 200,374" strokeWidth="4.5" />
          <path d="M214,212 C198,228 184,232 168,228" strokeWidth="3" />
          <path d="M210,262 C228,274 242,276 258,270" strokeWidth="3" />
          <path d="M212,318 C198,332 188,336 176,334" strokeWidth="2.5" />
          <path d="M188,178 C176,196 162,206 146,210" strokeWidth="3.5" />
        </g>

        {/* ---- EKG trace ---- */}
        {/* quiet teal tails */}
        <path d="M6,252 L118,252 L132,252 L140,242 L148,252 L168,252" stroke="#3F8E8E" strokeWidth="2.5" fill="none" opacity="0.85" />
        <path d="M252,252 L268,252 L278,244 L286,252 L394,252" stroke="#3F8E8E" strokeWidth="2.5" fill="none" opacity="0.85" />
        {/* bright center spike */}
        <g ref={spikeRef} style={{ opacity: reducedMotion ? 0.9 : 0.45 }} filter="url(#softGlow)">
          <path
            d="M168,252 L184,252 L192,236 L202,196 L212,308 L222,228 L230,252 L252,252"
            stroke="#cdf6ff"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M168,252 L184,252 L192,236 L202,196 L212,308 L222,228 L230,252 L252,252"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
