import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";

const JOIN_URL = "https://read.theshiftsignal.com/";

const LINKS = [
  { to: "/music", label: "Music" },
  { to: "/stories", label: "Stories" },
  { to: "/news", label: "News" },
  { to: "/advancement", label: "Advancement" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8"
        aria-label="Main"
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="The Shift Signal — home"
          onClick={() => setOpen(false)}
        >
          <Activity
            size={22}
            className="text-[#3dd9ff] transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
          <span className="font-display text-2xl font-semibold uppercase tracking-widest text-cream">
            The Shift Signal
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-display text-lg uppercase tracking-wider transition-colors hover:text-[#3dd9ff] ${
                  isActive ? "text-[#3dd9ff]" : "text-cream/85"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={JOIN_URL}
            className="rounded-lg border border-[#D88B3A]/70 bg-[#D88B3A]/10 px-4 py-1.5 font-display text-lg uppercase tracking-wider text-[#D88B3A] transition-all hover:bg-[#D88B3A] hover:text-charcoal hover:shadow-[0_0_24px_rgba(216,139,58,0.35)]"
          >
            Join The Signal
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className="md:hidden text-cream"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="glass mx-5 rounded-2xl p-5 md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-xl uppercase tracking-wider ${
                    isActive ? "text-[#3dd9ff]" : "text-cream/90"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={JOIN_URL}
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#D88B3A] px-5 py-3 text-center font-display text-xl uppercase tracking-wider text-charcoal"
            >
              Join The Signal
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
