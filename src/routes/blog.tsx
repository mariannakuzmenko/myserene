import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-chrome";
import { SmartImage } from "@/components/smart-image";
import { ARTICLES } from "@/lib/articles";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Articles — MySerene" },
      {
        name: "description",
        content:
          "Calm, practical articles on resetting your attention, ambient sound, evening routines, meditation and focus rituals.",
      },
      { property: "og:title", content: "Articles — MySerene" },
      {
        property: "og:description",
        content: "Short, human articles on calm, focus, sound and sleep from MySerene.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://myserene.lovable.app/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://myserene.lovable.app/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <PageShell>
      <section className="px-4 pt-10 sm:pt-16 pb-8">
        <SectionHeading
          eyebrow="Articles"
          title="Small essays on calm and focus."
          subtitle="Practical writing about resetting your attention, working with sound, and winding down at the end of the day."
        />
      </section>

      <section className="px-4 pt-4">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="glass-card rounded-[32px] overflow-hidden grid lg:grid-cols-2 group transition-all hover:-translate-y-1"
          >
            <div className="relative min-h-[220px] sm:min-h-[300px]">
              <SmartImage src={featured.image} alt={featured.title} className="group-hover:scale-[1.04] transition-transform duration-700" />
            </div>
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                {featured.category}
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-ink leading-tight break-words">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-ink/85 leading-relaxed">{featured.intro}</p>
              <div className="mt-6 flex items-center gap-4 text-xs font-medium text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {featured.read}
                </span>
                <span className="inline-flex items-center gap-1 text-ink group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              key={p.slug}
              className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group flex flex-col"
            >
              <div className="relative h-44 sm:h-48">
                <SmartImage src={p.card} alt={p.title} className="group-hover:scale-[1.06] transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{p.category}</div>
                <h3 className="mt-2 text-lg font-semibold text-ink leading-snug break-words">{p.title}</h3>
                <p className="mt-3 text-sm text-ink/80 leading-relaxed line-clamp-3">{p.intro}</p>
                <div className="mt-5 pt-4 border-t border-white/60 flex items-center justify-between text-xs font-medium text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {p.read}
                  </span>
                  <span className="inline-flex items-center gap-1 text-ink group-hover:gap-2 transition-all">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
