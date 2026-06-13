import { useRef } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { useHeartbeat } from "../lib/heartbeat";
import { STREAM_TRAVEL_MS } from "./LightStreams";

interface CategoryCardProps {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  /** Sync glow with the light stream arriving from the heart */
  syncWithStreams?: boolean;
  className?: string;
}

export default function CategoryCard({
  title,
  description,
  to,
  icon: Icon,
  syncWithStreams = false,
  className = "",
}: CategoryCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const timerRef = useRef<number | null>(null);

  useHeartbeat(
    syncWithStreams
      ? (strength) => {
          if (strength < 0.9) return; // glow on the strong beat only
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            const el = ref.current;
            if (!el) return;
            el.classList.add("card-surge");
            window.setTimeout(() => el.classList.remove("card-surge"), 420);
          }, STREAM_TRAVEL_MS - 80);
        }
      : undefined
  );

  return (
    <Link
      ref={ref}
      to={to}
      aria-label={`${title}: ${description}`}
      className={`glass glass-hover group block rounded-2xl p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 border border-white/10 text-[#3dd9ff] transition-colors group-hover:text-[#9ff0ff]">
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-cream">
          {title}
        </h3>
      </div>
      <p className="mt-3 font-editorial text-[15px] leading-relaxed text-cream/75">
        {description}
      </p>
    </Link>
  );
}
