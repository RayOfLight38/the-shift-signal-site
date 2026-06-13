import { Radio, ArrowUpRight } from "lucide-react";

const JOIN_URL = "https://read.theshiftsignal.com/";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`glass flex w-full flex-col items-center gap-4 rounded-2xl p-5 text-center ${compact ? "max-w-md" : "max-w-xl"}`}>
      <Radio size={22} className="text-[#3dd9ff]" aria-hidden="true" />
      <p className="font-editorial text-cream/80">
        Subscribe on The Shift Signal publication page and get the first transmission when it goes live.
      </p>
      <a
        href={JOIN_URL}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D88B3A] px-7 py-3 font-display text-lg font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-[#e89c4b] hover:shadow-[0_0_28px_rgba(216,139,58,0.4)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3dd9ff]/70 focus:ring-offset-2 focus:ring-offset-[#1a1816]"
      >
        Join The Signal
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
