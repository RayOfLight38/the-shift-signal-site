import { Radio, Landmark, Coffee } from "lucide-react";
import PageShell from "../components/PageShell";

export default function News() {
  return (
    <PageShell
      eyebrow="Nurse News"
      title="Nurse News"
      lede="A weekly nurse-centered brief on the profession, the policy, and the culture — written for the break room, not the boardroom."
      ctaHeading="Subscribe to the Shift Brief"
    >
      <div className="grid gap-6">
        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <Radio size={22} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              The Shift Brief
            </h2>
          </div>
          <p className="mt-4 font-editorial leading-relaxed text-cream/75">
            The core transmission: the handful of stories that actually matter
            to working nurses this week, distilled to a read you can finish
            before your coffee cools. No filler, no fearmongering, no
            twelve-paragraph wind-ups.
          </p>
        </article>

        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <Landmark size={22} className="text-[#D88B3A]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              Policy &amp; the Workplace
            </h2>
          </div>
          <p className="mt-4 font-editorial leading-relaxed text-cream/75">
            Staffing ratios, licensure changes, contract movements, workplace
            safety — translated from legislative language into what it means
            for your unit, your schedule, and your paycheck.
          </p>
        </article>

        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <Coffee size={22} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              Nurse Culture &amp; Local Identity
            </h2>
          </div>
          <p className="mt-4 font-editorial leading-relaxed text-cream/75">
            The creators, the memes, the regional quirks, the traditions that
            make nursing a culture and not just a career. What the floor is
            talking about — from your region and beyond.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
