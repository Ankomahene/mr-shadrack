import { ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Reveal } from '../components/site/primitives.tsx';
import { useJournal } from '../lib/data.ts';
import { useSeo } from '../lib/seo.ts';
import { formatDate } from '../lib/utils.ts';

export function Journal() {
  useSeo({
    title: 'Journal',
    description: 'Work, life and lessons from the year — notes by Shadrack Ankomahene.',
    path: '/journal',
  });
  const { data: entries, isLoading } = useJournal();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash && entries?.length) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [hash, entries]);

  const years = Object.entries(
    (entries ?? []).reduce<Record<string, typeof entries>>((acc, e) => {
      const y = e.date.slice(0, 4);
      (acc[y] ??= []).push(e);
      return acc;
    }, {}),
  ).sort(([a], [b]) => Number(b) - Number(a));

  return (
    <div className="container-page pt-32 pb-24 md:pt-40">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">Journal</p>
        <h1 className="text-5xl font-semibold tracking-[-0.035em] md:text-7xl">Notes from the year.</h1>
        <p className="mt-6 text-lg text-muted-foreground">Work shipped, lessons learned, and life in between.</p>
      </Reveal>

      {isLoading && <p className="mt-20 font-mono text-sm text-muted-foreground">Loading…</p>}
      {!isLoading && !entries?.length && <p className="mt-20 text-muted-foreground">No entries yet.</p>}

      {years.map(([year, list]) => (
        <section key={year} className="mt-20 grid gap-8 md:grid-cols-[160px_1fr]">
          <p className="font-mono text-5xl font-medium tracking-tight text-muted-foreground/40 md:sticky md:top-24 md:self-start">
            {year}
          </p>
          <ol className="space-y-px">
            {list!.map((e) => (
              <Reveal as="li" key={e.id}>
                <article id={e.id} className="border-t border-border py-10">
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatDate(e.date)}
                    {e.category && <span className="text-brand"> · {e.category}</span>}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{e.title}</h2>
                  <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-pretty text-foreground/80">
                    {e.body.split(/\n{2,}/).map((para, n) => (
                      <p key={n} className="whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>
                  {(e.tags.length > 0 || e.link) && (
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                      {e.link && (
                        <a
                          href={e.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-1 inline-flex items-center gap-1 text-sm font-medium hover:text-brand"
                        >
                          {e.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]} <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export default Journal;
