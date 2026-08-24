import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Music, Sparkles } from "lucide-react";
import { PageShell, Scene } from "@/components/site-chrome";
import { SmartImage } from "@/components/smart-image";
import { ARTICLES, getArticle } from "@/lib/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — MySerene` : "Article — MySerene";
    const description = a?.intro ?? "An article from MySerene.";
    const url = `https://myserene.lovable.app/blog/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(a?.image?.startsWith("https://")
          ? [
              { property: "og:image", content: a.image },
              { name: "twitter:image", content: a.image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: a.title,
                description: a.intro,
                articleSection: a.category,
                publisher: { "@type": "Organization", name: "MySerene" },
              }),
            },
          ]
        : [],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <PageShell>
      <section className="px-4">
        <div className="mx-auto max-w-5xl">
          <Scene image={article.image} minHeight="clamp(260px, 42vh, 440px)" className="rounded-[32px] overflow-hidden">
            <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 max-w-3xl">
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink">
                {article.category}
              </span>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-[1.08] break-words">
                {article.title}
              </h1>
              <div className="mt-5 inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink">
                <Clock className="h-3.5 w-3.5" /> {article.read}
              </div>
            </div>
          </Scene>
        </div>
      </section>

      <article className="px-4 pt-8">
        <div className="mx-auto max-w-3xl glass-card rounded-[32px] p-6 sm:p-10 md:p-12">
          <p className="text-lg sm:text-xl text-ink font-medium leading-relaxed">{article.intro}</p>
          <div className="mt-8 space-y-10">
            {article.sections.map((s, i) => (
              <section key={i} className="space-y-4">
                {s.heading && (
                  <h2 className="text-xl sm:text-2xl font-semibold text-ink leading-snug">{s.heading}</h2>
                )}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="text-base text-ink/85 leading-[1.85]">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="space-y-3">
                    {s.list.map((li, j) => (
                      <li key={j} className="flex gap-3 text-base text-ink/85 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.key && (
                  <p className="glass rounded-3xl px-5 py-4 text-base font-semibold text-ink leading-relaxed border-l-4 border-brand">
                    {s.key}
                  </p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/60 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                <Music className="h-3.5 w-3.5" /> Related sounds
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.relatedSounds.map((s) => (
                  <Link
                    key={s}
                    to="/sounds"
                    className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
            {article.relatedExperience && (
              <div className="glass rounded-3xl p-5 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  <Sparkles className="h-3.5 w-3.5" /> Try next
                </div>
                <Link
                  to={article.relatedExperience.to}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                  {article.relatedExperience.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="px-4 pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl font-semibold text-ink">Keep reading</h2>
            <Link to="/blog" className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                key={p.slug}
                className="glass-card rounded-3xl overflow-hidden group transition-all hover:-translate-y-1"
              >
                <div className="relative h-40">
                  <SmartImage src={p.card} alt={p.title} className="group-hover:scale-[1.06] transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{p.category}</div>
                  <h3 className="mt-2 text-base font-semibold text-ink leading-snug break-words">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
