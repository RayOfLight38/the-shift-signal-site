import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Music, BookOpen, Newspaper, TrendingUp, Radio } from "lucide-react";
import Hero from "../components/Hero";
import NewsletterSignup from "../components/NewsletterSignup";

const COMMUNITY = [
  {
    icon: Music,
    title: "Songs that get the shift",
    copy: "Anthems written from real floor moments — submitted by nurses, voted on by nurses.",
    to: "/music",
  },
  {
    icon: BookOpen,
    title: "Stories told straight",
    copy: "The wins, the heartbreak, the 3 a.m. humor. No corporate gloss, no stock-photo smiles.",
    to: "/stories",
  },
  {
    icon: Newspaper,
    title: "News that respects your time",
    copy: "One sharp weekly brief on what actually matters in nursing and healthcare culture.",
    to: "/news",
  },
  {
    icon: TrendingUp,
    title: "Growth on your terms",
    copy: "CE, grants, career moves, and side hustles — practical paths, not pep talks.",
    to: "/advancement",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "The Shift Signal — Less Stress. More Pulse.";
  }, []);

  return (
    <main>
      <Hero />

      {/* community */}
      <section
        id="community"
        aria-label="The community"
        className="border-t border-white/10 bg-charcoal"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-base uppercase tracking-[0.3em] text-[#D88B3A]">
              The Community
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-cream sm:text-5xl">
              For the nurses who carry the shift.
            </h2>
            <p className="mt-4 font-editorial text-lg leading-relaxed text-cream/75">
              A weekly transmission for the people holding healthcare together
              — built by a nurse and the people who love one.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {COMMUNITY.map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="glass glass-hover block rounded-2xl p-6"
              >
                <c.icon size={22} className="text-[#3dd9ff]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-cream">
                  {c.title}
                </h3>
                <p className="mt-2 font-editorial leading-relaxed text-cream/70">
                  {c.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* join */}
      <section
        id="join"
        aria-label="Join the weekly signal"
        className="border-t border-white/10 bg-[#1a1816]"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center sm:px-8">
          <Radio size={26} className="text-[#3dd9ff]" aria-hidden="true" />
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-cream">
            Join the Weekly Signal
          </h2>
          <p className="max-w-xl font-editorial text-lg text-cream/75">
            One email a week. Less stress. More pulse. Unsubscribe whenever the
            shift demands it.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </main>
  );
}
