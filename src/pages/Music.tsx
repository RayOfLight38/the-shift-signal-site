import { Music2, Trophy, PenLine } from "lucide-react";
import PageShell from "../components/PageShell";

export default function Music() {
  return (
    <PageShell
      eyebrow="Nurse Music"
      title="Nurse Music"
      lede="Original songs, nurse anthems, music contests, community voting — soundtracks built for the people who work to a monitor's rhythm."
      ctaHeading="New tracks land in the signal first"
    >
      <div className="grid gap-6">
        {/* featured track */}
        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <Music2 size={22} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              Featured Track
            </h2>
          </div>
          <div className="mt-5 flex items-center gap-5 rounded-xl border border-white/10 bg-black/30 p-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-[#8B2D3A]/40 font-display text-2xl text-[#3dd9ff]">
              ♪
            </div>
            <div>
              <p className="font-display text-xl uppercase tracking-wide text-cream">
                First anthem in production
              </p>
              <p className="mt-1 font-editorial text-cream/65">
                The debut Shift Signal track drops with an early issue of the
                newsletter. Subscribers hear it first.
              </p>
            </div>
          </div>
        </article>

        {/* contest */}
        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <Trophy size={22} className="text-[#D88B3A]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              The Shift Anthem Contest
            </h2>
          </div>
          <p className="mt-4 font-editorial leading-relaxed text-cream/75">
            Nurses submit the moments. We turn the best into songs. The
            community votes on which anthem represents the shift — and as the
            project grows, we're exploring ways for the nurses behind winning
            stories to share in what their songs earn.
          </p>
        </article>

        {/* submit */}
        <article className="glass rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <PenLine size={22} className="text-[#3dd9ff]" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-cream">
              Submit a shift story that should become a song
            </h2>
          </div>
          <p className="mt-4 font-editorial leading-relaxed text-cream/75">
            The code you couldn't shake. The save nobody saw. The night-shift
            playlist that got the whole pod through. If it deserves a chorus,
            send it through the weekly signal — submission details arrive in
            every issue.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
