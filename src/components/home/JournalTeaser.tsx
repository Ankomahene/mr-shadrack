import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useJournal } from '../../lib/data.ts';
import { formatDate } from '../../lib/utils.ts';
import { Reveal } from '../site/primitives.tsx';

export function JournalTeaser() {
  const { data: entries } = useJournal();
  if (!entries?.length) return null;

  return (
    <section className="border-t border-border">
      <div className="container-page py-20 md:py-24">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Journal</p>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Notes from the year</h3>
          </div>
          <Link to="/journal" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-[gap] hover:gap-2.5">
            All entries <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {entries.slice(0, 3).map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06}>
              <Link
                to={`/journal#${e.id}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-foreground/20 hover:bg-card"
              >
                <p className="font-mono text-xs text-muted-foreground">
                  {formatDate(e.date)}
                  {e.category && <span className="text-brand"> · {e.category}</span>}
                </p>
                <h4 className="mt-3 font-medium tracking-tight">{e.title}</h4>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
