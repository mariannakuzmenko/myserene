import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Serene" },
      { name: "description", content: "Say hello. We reply within one business day." },
      { property: "og:title", content: "Contact — Serene" },
      { property: "og:description", content: "Get in touch with the Serene team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <section className="px-4 pt-16 pb-8">
        <SectionHeading eyebrow="Contact" title="Say hello, gently." subtitle="We read every message and reply within one business day." />
      </section>
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <form className="glass-card rounded-[32px] p-8 space-y-4">
            <Field label="Name" placeholder="Your name" />
            <Field label="Email" placeholder="you@example.com" type="email" />
            <div>
              <label className="text-sm font-medium text-ink">Message</label>
              <textarea rows={5} placeholder="How can we help?"
                className="mt-2 w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/60 resize-none" />
            </div>
            <button type="button" className="btn-primary w-full px-6 py-3 rounded-full text-sm font-semibold">
              Send message
            </button>
          </form>
          <div className="flex flex-col gap-4">
            <ContactCard icon={Mail} title="Email" text="hello@serene.app" />
            <ContactCard icon={MessageCircle} title="Support" text="Live chat, 9-6 CET" />
            <ContactCard icon={MapPin} title="Studio" text="Stockholm · Lisbon · Kyoto" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input {...props} className="mt-2 w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/60" />
    </div>
  );
}

function ContactCard({ icon: Icon, title, text }: { icon: typeof Mail; title: string; text: string }) {
  return (
    <div className="glass-card rounded-3xl p-6 flex items-start gap-4">
      <div className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-mist to-brand-soft shrink-0">
        <Icon className="h-5 w-5 text-ink" />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-ink-soft mt-0.5">{text}</div>
      </div>
    </div>
  );
}