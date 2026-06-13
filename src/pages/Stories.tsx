import { Trophy, Moon, HeartHandshake, Flame, Laugh, Star, ShieldAlert, Send } from "lucide-react";
import PageShell from "../components/PageShell";

const CATEGORIES = [
  { icon: Trophy, name: "Wins", copy: "The saves, the comebacks, the discharges that felt like graduations." },
  { icon: Moon, name: "Night Shift", copy: "What only the 3 a.m. crew understands. Sodium lights and second winds." },
  { icon: HeartHandshake, name: "Patient Moments", copy: "The connections that stay with you long after report." },
  { icon: Flame, name: "Burnout", copy: "Honest words about running on empty — and what helped." },
  { icon: Laugh, name: "Funny", copy: "Because if you didn't laugh on this job, you'd never make it to lunch." },
  { icon: Star, name: "Unforgettable", copy: "The shifts that changed who you are. Told your way." },
];

export default function Stories() {
  return (
    <PageShell
      eyebrow="Nurse Stories"
      title="Nurse Stories"
      lede="Real moments from the floor — anonymous or credited, your call. The wins, the heartbreak, the humor, and the humanity."
      ctaHeading="The best stories run in the weekly signal"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <article key={c.name} className="glass glass-hover rounded-2xl p-6">
            <c.icon size={22} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-cream">
              {c.name}
            </h2>
            <p className="mt-2 font-editorial leading-relaxed text-cream/70">{c.copy}</p>
          </article>
        ))}
      </div>

      <div className="glass mt-8 rounded-2xl p-7">
        <div className="flex items-center gap-3">
          <Send size={22} className="text-[#D88B3A]" aria-hidden="true" />
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
            Tell yours
          </h2>
        </div>
        <p className="mt-4 font-editorial leading-relaxed text-cream/75">
          Story submissions open through the newsletter — every issue includes
          a reply-to line that goes straight to a real human. Choose your name
          on it or full anonymity.
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#8B2D3A]/50 bg-[#8B2D3A]/10 p-4">
          <ShieldAlert size={20} className="mt-0.5 shrink-0 text-[#D88B3A]" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-cream/70">
            Protect your patients and your license: do not submit names, dates,
            facility identifiers, or any details that could identify a patient.
            We edit for privacy, but it starts with you.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
