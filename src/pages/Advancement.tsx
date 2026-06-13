import { GraduationCap, HandCoins, TrendingUp, Briefcase } from "lucide-react";
import PageShell from "../components/PageShell";

const TRACKS = [
  {
    icon: GraduationCap,
    title: "CE & Certification",
    copy: "Continuing education that's worth your off-shift hours — curated courses, renewal reminders, and certification paths mapped specialty by specialty.",
  },
  {
    icon: HandCoins,
    title: "Grants & Scholarships",
    copy: "Money that's already set aside for nurses and goes unclaimed every year. We surface deadlines and eligibility in plain language.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    copy: "Bedside to leadership, clinic to informatics, staff to travel. Honest looks at the routes, the trade-offs, and the first step for each.",
  },
  {
    icon: Briefcase,
    title: "Nurse Side Hustles",
    copy: "Legal review, content, education, per-diem strategy, and other ways nurses are building income beyond the badge — vetted, not hyped.",
  },
];

export default function Advancement() {
  return (
    <PageShell
      eyebrow="Nurse Advancement"
      title="Nurse Advancement"
      lede="Career moves, CE resources, grants, side hustles, leadership, and growth — practical paths for wherever you want the license to take you."
      ctaHeading="Growth resources, every week"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {TRACKS.map((t) => (
          <article key={t.title} className="glass glass-hover rounded-2xl p-7">
            <t.icon size={24} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-cream">
              {t.title}
            </h2>
            <p className="mt-2 font-editorial leading-relaxed text-cream/70">{t.copy}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
