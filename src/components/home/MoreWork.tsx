import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import type { Project } from '../../lib/data.ts';
import { cn } from '../../lib/utils.ts';
import { ShotImage } from '../site/frames.tsx';
import { Reveal } from '../site/primitives.tsx';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client work' },
  { id: 'side', label: 'Side projects' },
] as const;

export function MoreWork({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const shown = projects.filter((p) => filter === 'all' || p.category === filter);
  if (!projects.length) return null;

  return (
    <section className="container-page pb-24 md:pb-32">
      <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-3">More work</p>
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Client sites and experiments</h3>
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-surface p-1" role="tablist">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                filter === f.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <Link to={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                <ShotImage
                  src={p.cover}
                  alt={p.name}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase backdrop-blur">
                  {p.category === 'client' ? 'Client' : 'Side project'}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-medium tracking-tight">{p.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground">
                  {p.year}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground/80">{p.stack.slice(0, 4).join(' · ')}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
