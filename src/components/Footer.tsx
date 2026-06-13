import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const LINKS = [
  { to: "/music", label: "Music" },
  { to: "/stories", label: "Stories" },
  { to: "/news", label: "News" },
  { to: "/advancement", label: "Advancement" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#171513]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <Activity size={20} className="text-[#3dd9ff]" aria-hidden="true" />
              <span className="font-display text-xl font-semibold uppercase tracking-widest text-cream">
                The Shift Signal
              </span>
            </div>
            <p className="mt-2 font-editorial italic text-cream/60">
              Less Stress. More Pulse.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-lg uppercase tracking-wider text-cream/75 transition-colors hover:text-[#3dd9ff]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-cream/45">
          The Shift Signal is a media and community publication. Content is for
          informational and entertainment purposes only and is not medical,
          legal, or financial advice.
        </p>
      </div>
    </footer>
  );
}
