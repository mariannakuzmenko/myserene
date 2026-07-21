import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Serene" },
      { name: "description", content: "Free, Premium and Family plans. Seven days free, cancel any time." },
      { property: "og:title", content: "Pricing — Serene" },
      { property: "og:description", content: "Simple plans. Big calm." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Free", price: "$0", per: "forever",
    desc: "The essentials to start your practice.",
    features: ["8 curated sounds", "3 guided meditations", "Basic timer", "Sync on one device"],
    cta: "Start free", highlight: false,
  },
  {
    name: "Premium", price: "$7", per: "/ month",
    desc: "Everything, unlocked. For daily calm.",
    features: ["Full sound library", "All guided sessions", "Sleep stories", "Sound mixer", "Cross-device sync", "Offline downloads"],
    cta: "Start 7-day free trial", highlight: true,
  },
  {
    name: "Family", price: "$12", per: "/ month",
    desc: "Up to 6 accounts. One quiet home.",
    features: ["Everything in Premium", "Up to 6 members", "Kids sleep stories", "Family dashboard", "Priority support"],
    cta: "Start Family plan", highlight: false,
  },
];

function PricingPage() {
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading eyebrow="Pricing" title="Simple plans. Big calm." subtitle="Seven days free on Premium. No card required." />
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl grid gap-5 md:grid-cols-3 items-stretch">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[32px] p-8 flex flex-col transition-all hover:-translate-y-1 ${
                p.highlight ? "glass-card ring-2 ring-brand/60 shadow-[0_40px_80px_-30px_rgba(135,200,255,0.6)]" : "glass"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 btn-primary px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="h-3 w-3" /> Most loved
                </span>
              )}
              <div className="text-sm font-medium text-ink-soft">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-ink-soft">{p.per}</span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{p.desc}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="grid place-items-center h-5 w-5 rounded-full bg-gradient-to-br from-brand-soft to-brand shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                    </span>
                    <span className="text-ink">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`mt-8 w-full text-center px-5 py-3 rounded-full text-sm font-semibold ${p.highlight ? "btn-primary" : "btn-ghost"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}