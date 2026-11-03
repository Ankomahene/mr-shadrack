import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '../../lib/data.ts';
import { cn } from '../../lib/utils.ts';
import { PhoneFrame, Shot, ShotImage } from '../site/frames.tsx';
import { Reveal, SectionHeading } from '../site/primitives.tsx';
import { TechChip } from '../site/tech.tsx';

const categoryLabel = { product: 'Product', client: 'Client', side: 'Side project' } as const;

function CaseCard({ project: p, index }: { project: Project; index: number }) {
  const cover = p.gallery.find((g) => g.src === p.cover) ?? p.gallery[0];
  const phone = p.gallery.find((g) => g.frame === 'phone' && g !== cover);
  const flip = index % 2 === 1;
  const href = `/work/${p.slug}`;

  return (
    <Reveal
      as="article"
      className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/60 p-6 sm:p-8 lg:p-12"
    >
      <div
        className="pointer-events-none absolute -top-1/3 h-[140%] w-2/3 opacity-[0.14] blur-[90px] transition-opacity duration-700 group-hover:opacity-25 dark:opacity-[0.12]"
        style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)`, [flip ? 'left' : 'right']: '-10%' }}
      />
      <div className={cn('relative grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14', flip && 'lg:grid-cols-[1.18fr_0.82fr]')}>
        <div className={cn(flip && 'lg:order-2')}>
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            <span style={{ color: p.accent }}>{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 opacity-40">—</span>
            {categoryLabel[p.category]} · {p.platforms.join(', ')} · {p.year}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            <Link to={href} className="after:absolute after:inset-0 after:z-0 focus-visible:outline-none">
              {p.name}
            </Link>
          </h3>
          <p className="mt-2 text-lg text-foreground/80">{p.tagline}</p>
          <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{p.description}</p>

          {p.highlights.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {p.highlights.slice(0, 2).map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0" style={{ color: p.accent }} />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 6).map((s) => (
              <TechChip key={s} name={s} />
            ))}
            {p.stack.length > 6 && <span className="self-center px-1 font-mono text-[11px] text-muted-foreground">+{p.stack.length - 6}</span>}
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-5 text-sm font-medium">
            <Link to={href} className="inline-flex items-center gap-1.5 transition-[gap] hover:gap-2.5">
              Read case study <ArrowRight className="size-4" />
            </Link>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                {p.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]} <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className={cn('relative', flip && 'lg:order-1')}>
          {cover && (
            <div className="transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
              {cover.frame === 'phone' ? (
                <div className="mx-auto w-[46%] max-w-[260px]">
                  <Shot image={cover} sizes="260px" />
                </div>
              ) : (
                <Shot image={cover} url={p.link} title={p.name} sizes="(min-width: 1024px) 640px, 100vw" className="shadow-float" />
              )}
            </div>
          )}
          {phone && (
            <div className="absolute -right-2 -bottom-6 w-[24%] transition-transform duration-700 group-hover:-translate-y-3 sm:right-4">
              <PhoneFrame className="shadow-float">
                <ShotImage src={phone.src} alt={phone.alt} sizes="160px" />
              </PhoneFrame>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="container-page py-24 md:py-32">
      <SectionHeading index="01" label="Selected work" title="Products I’ve designed, built and shipped.">
        Most of my recent work is my own: software for businesses in Ghana, built end to end, from the database to the
        installer.
      </SectionHeading>
      <div className="space-y-6 md:space-y-8">
        {projects.map((p, i) => (
          <CaseCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
