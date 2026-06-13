import { useEffect, type ReactNode } from "react";
import NewsletterSignup from "./NewsletterSignup";

interface PageShellProps {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  ctaHeading?: string;
}

/** Shared layout for /music, /stories, /news, /advancement */
export default function PageShell({
  eyebrow,
  title,
  lede,
  children,
  ctaHeading = "Get the weekly transmission",
}: PageShellProps) {
  useEffect(() => {
    document.title = `${title} — The Shift Signal`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main className="relative bg-charcoal pt-28">
      {/* faint EKG hairline behind the header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-40 h-px bg-gradient-to-r from-transparent via-[#3F5E5E]/60 to-transparent"
        aria-hidden="true"
      />
      <header className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-display text-base uppercase tracking-[0.3em] text-[#D88B3A]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-cream sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-editorial text-lg leading-relaxed text-cream/75">
          {lede}
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">{children}</div>

      <section
        aria-label="Newsletter signup"
        className="border-t border-white/10 bg-[#1a1816]"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-16 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
            {ctaHeading}
          </h2>
          <p className="font-editorial text-cream/70">
            Real stories. Real resources. Real signal. Once a week, free.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </main>
  );
}
