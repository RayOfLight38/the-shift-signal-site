import { Music, BookOpen, Newspaper, TrendingUp } from "lucide-react";
import BackgroundVideo from "./BackgroundVideo";
import PulsingHeart from "./PulsingHeart";
import LightStreams from "./LightStreams";
import CategoryCard from "./CategoryCard";

const JOIN_URL = "https://read.theshiftsignal.com/";

const CATEGORIES = [
  {
    title: "Nurse Music",
    description:
      "Original songs, shift anthems, contests, and soundtracks built for nurses.",
    to: "/music",
    icon: Music,
    // anchors match the stream endpoints in LightStreams.tsx (viewBox %)
    pos: "left-[18%] top-[24%]",
  },
  {
    title: "Nurse Stories",
    description:
      "Real moments from the floor — the wins, the heartbreak, the humor, and the humanity.",
    to: "/stories",
    icon: BookOpen,
    pos: "left-[82%] top-[24%]",
  },
  {
    title: "Nurse News",
    description:
      "The weekly signal on what matters in nursing, healthcare, culture, and the shift.",
    to: "/news",
    icon: Newspaper,
    pos: "left-[18%] top-[76%]",
  },
  {
    title: "Nurse Advancement",
    description:
      "Career moves, CE resources, grants, side hustles, leadership, and growth.",
    to: "/advancement",
    icon: TrendingUp,
    pos: "left-[82%] top-[76%]",
  },
] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundVideo />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-24 sm:px-8 lg:pt-28">
        {/* headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            The Signal Nurses Have Been{" "}
            <span className="text-[#3dd9ff] drop-shadow-[0_0_24px_rgba(61,217,255,0.45)]">
              Waiting For.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-editorial text-lg leading-relaxed text-cream/80 sm:text-xl">
            A nurse-led media community bringing you music, real stories, sharp
            news, career resources, and the kind of shift-life truth only
            nurses understand.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={JOIN_URL}
              className="rounded-xl bg-[#D88B3A] px-8 py-3.5 font-display text-xl font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-[#e89c4b] hover:shadow-[0_0_32px_rgba(216,139,58,0.45)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3dd9ff]/70 focus:ring-offset-2 focus:ring-offset-black"
            >
              Join The Signal
            </a>
            <a
              href="#community"
              className="glass glass-hover rounded-xl px-8 py-3.5 font-display text-xl font-semibold uppercase tracking-wider text-cream focus:outline-none focus:ring-2 focus:ring-[#3dd9ff]/70 focus:ring-offset-2 focus:ring-offset-black"
            >
              Explore the Community
            </a>
          </div>
          <p className="mt-4 font-editorial text-sm italic tracking-wide text-cream/55">
            Built for the nurses who keep healthcare alive.
          </p>
        </div>

        {/* ---- desktop / tablet constellation ---- */}
        <div className="relative mx-auto mt-4 hidden w-full max-w-6xl flex-1 lg:block lg:min-h-[560px]">
          <LightStreams className="absolute inset-0 h-full w-full" />
          <PulsingHeart className="absolute left-1/2 top-1/2 h-[420px] w-[380px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_60px_rgba(61,217,255,0.2)]" />
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.to}
              title={c.title}
              description={c.description}
              to={c.to}
              icon={c.icon}
              syncWithStreams
              className={`absolute w-[280px] -translate-x-1/2 -translate-y-1/2 ${c.pos}`}
            />
          ))}
        </div>

        {/* ---- mobile / small-tablet stack ---- */}
        <div className="mt-2 lg:hidden">
          <div className="relative mx-auto w-fit">
            <PulsingHeart className="mx-auto h-[300px] w-[270px] drop-shadow-[0_0_44px_rgba(61,217,255,0.2)] sm:h-[340px] sm:w-[306px]" />
            {/* simplified beam connecting heart to the cards below */}
            <div
              className="absolute -bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#3dd9ff]/70 to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <CategoryCard
                key={c.to}
                title={c.title}
                description={c.description}
                to={c.to}
                icon={c.icon}
              />
            ))}
          </div>
        </div>

        <div className="pb-14 lg:pb-10" aria-hidden="true" />
      </div>
    </section>
  );
}
