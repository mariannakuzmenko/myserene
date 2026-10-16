import { PageShell } from "@/components/site-chrome";

export type LegalSection = { h: string; p?: string[]; list?: string[] };

const BASE = "https://myserene.lovable.app";

export function legalHead(path: string, title: string, description: string) {
  const full = `${title} — MySerene`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE}${path}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${BASE}${path}` }],
  };
}

export function LegalPage({ title, intro, updated = "Stand: [DATUM]", sections }: {
  title: string; intro?: string; updated?: string; sections: LegalSection[];
}) {
  return (
    <PageShell>
      <article lang="de" className="px-4 pt-12">
        <div className="mx-auto max-w-3xl glass-card rounded-[32px] p-6 sm:p-10 md:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Rechtliches</span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-ink leading-tight break-words">{title}</h1>
          <p className="mt-3 text-sm text-ink-soft">{updated}</p>
          {intro && <p className="mt-6 text-base text-ink/85 leading-relaxed">{intro}</p>}
          <div className="mt-6 rounded-2xl border border-ink/15 bg-white/60 p-4 text-sm text-ink/85">
            Hinweis: Dieser Text ist eine Vorlage und muss vor dem Start kostenpflichtiger Angebote von einer Rechtsanwältin bzw. einem Rechtsanwalt geprüft werden. Platzhalter in [ECKIGEN KLAMMERN] sind zu ergänzen.
          </div>
          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-xl sm:text-2xl font-semibold text-ink">{s.h}</h2>
                {s.p?.map((t, i) => (
                  <p key={i} className="mt-3 text-base text-ink/85 leading-relaxed whitespace-pre-line break-words">{t}</p>
                ))}
                {s.list && (
                  <ul className="mt-3 list-disc pl-5 space-y-1.5 text-base text-ink/85 leading-relaxed">
                    {s.list.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
