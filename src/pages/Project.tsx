import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { Shot } from '../components/site/frames.tsx';
import { Lightbox } from '../components/site/Lightbox.tsx';
import { Reveal } from '../components/site/primitives.tsx';
import { TechChip } from '../components/site/tech.tsx';
import { Button } from '../components/ui/button.tsx';
import { useProject } from '../lib/data.ts';
import { useSeo } from '../lib/seo.ts';
import { cn } from '../lib/utils.ts';
import { NotFound } from './NotFound.tsx';

const categoryLabel = { product: 'Product', client: 'Client project', side: 'Side project' } as const;
const ease = [0.16, 1, 0.3, 1] as const;

export function Project() {
  const { slug } = useParams();
  const { data: project, all } = useProject(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useSeo({
    title: project ? `${project.name} — ${project.tagline}` : 'Not found',
    description: project?.description,
    path: `/work/${slug}`,
    image: project ? `/og/${project.slug}.jpg` : undefined,
    noindex: !project,
  });

  if (!project) return <NotFound />;
  const p = project;

  const i = all.findIndex((x) => x.slug === p.slug);
  const next = all[(i + 1) % all.length];
  const hero = p.gallery.find((g) => g.src === p.cover) ?? p.gallery[0];
  const rest = p.gallery.filter((g) => g !== hero);
  const phones = rest.filter((g) => g.frame === 'phone');
  const wide = rest.filter((g) => g.frame !== 'phone');

  const meta = [
    { label: 'Role', value: p.role },
    { label: 'Year', value: p.year },
    { label: 'Platforms', value: p.platforms.join(', ') },
    { label: 'Type', value: categoryLabel[p.category] },
  ].filter((m) => m.value);

  return (
    <article className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] opacity-20 dark:opacity-15"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, ${p.accent}, transparent)` }}
      />

      <header className="container-page relative pt-28 md:pt-36">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mt-10 max-w-3xl"
        >
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            <span className="mr-2 inline-block size-2 rounded-full" style={{ background: p.accent }} />
            {categoryLabel[p.category]} · {p.year}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.035em] md:text-7xl">{p.name}</h1>
          <p className="mt-4 text-xl text-balance text-foreground/80 md:text-2xl">{p.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.link && (
              <Button asChild variant="brand" size="lg">
                <a href={p.link} target="_blank" rel="noreferrer">
                  Visit {p.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]} <ArrowUpRight />
                </a>
              </Button>
            )}
            {p.repo && (
              <Button asChild variant="outline" size="lg">
                <a href={p.repo} target="_blank" rel="noreferrer">
                  <FaGithub /> Source
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {meta.map((m) => (
            <div key={m.label} className="bg-background/90 p-5 backdrop-blur">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2 text-sm font-medium">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      </header>

      {hero && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="container-page mt-12"
        >
          <button
            type="button"
            onClick={() => setLightbox(p.gallery.indexOf(hero))}
            className={cn('group relative block w-full cursor-zoom-in', hero.frame === 'phone' && 'mx-auto max-w-[300px]')}
          >
            <Shot image={hero} url={p.link} title={p.name} sizes="(min-width: 1152px) 1100px, 100vw" priority className="shadow-float" />
            <span className="absolute right-4 bottom-4 grid size-9 place-items-center rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-4" />
            </span>
          </button>
        </motion.div>
      )}

      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="space-y-14">
          {p.overview && (
            <Reveal>
              <p className="eyebrow mb-5">Overview</p>
              <div className="space-y-5 text-lg leading-relaxed text-pretty text-foreground/85">
                {p.overview.split(/\n{2,}/).map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </Reveal>
          )}
          {p.highlights.length > 0 && (
            <Reveal>
              <p className="eyebrow mb-5">What I built</p>
              <ul className="space-y-4">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-4 leading-relaxed text-foreground/85">
                    <span
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                      style={{ background: `${p.accent}22`, color: p.accent }}
                    >
                      <Check className="size-3.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal as="div" className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mb-4">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <TechChip key={s} name={s} className="text-[12px]" />
            ))}
          </div>
        </Reveal>
      </div>

      {(wide.length > 0 || phones.length > 0) && (
        <section className="container-page pb-24">
          <Reveal>
            <p className="eyebrow mb-8">Gallery</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {wide.map((g, n) => (
              <Reveal key={g.src} delay={(n % 2) * 0.06}>
                <button type="button" onClick={() => setLightbox(p.gallery.indexOf(g))} className="block w-full cursor-zoom-in text-left">
                  <Shot image={g} url={p.link} title={p.name} sizes="(min-width: 768px) 560px, 100vw" className="transition-transform duration-500 hover:-translate-y-1" />
                  <p className="mt-3 text-sm text-muted-foreground">{g.alt}</p>
                </button>
              </Reveal>
            ))}
            {phones.map((g) => (
              <Reveal key={g.src} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8">
                <button type="button" onClick={() => setLightbox(p.gallery.indexOf(g))} className="w-[220px] cursor-zoom-in">
                  <Shot image={g} />
                </button>
                <p className="mt-4 text-sm text-muted-foreground">{g.alt}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {next && next.slug !== p.slug && (
        <Link to={`/work/${next.slug}`} className="group block border-t border-border">
          <div className="container-page flex items-center justify-between gap-6 py-14 md:py-20">
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-5xl">
                {next.name}
              </p>
              <p className="mt-2 text-muted-foreground">{next.tagline}</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground md:size-20">
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      <Lightbox images={p.gallery} index={lightbox} onIndexChange={setLightbox} />
    </article>
  );
}

export default Project;
