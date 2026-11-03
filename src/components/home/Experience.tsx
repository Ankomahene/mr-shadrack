import { ArrowUpRight, FileText } from 'lucide-react';
import { useExperience } from '../../lib/data.ts';
import { site } from '../../lib/site.ts';
import { Reveal, SectionHeading } from '../site/primitives.tsx';
import { TechChip } from '../site/tech.tsx';

export function Experience() {
  const { data: jobs } = useExperience();

  return (
    <section id="experience" className="border-t border-border bg-surface/50">
      <div className="container-page py-24 md:py-32">
        <SectionHeading index="02" label="Experience" title="Where I’ve done the work.">
          Enterprise platforms, early-stage startups and my own company, often at the same time.
        </SectionHeading>

        <ol className="relative">
          {jobs.map((job, i) => (
            <Reveal
              as="li"
              key={job.id}
              delay={Math.min(i, 3) * 0.05}
              className="group grid gap-4 border-t border-border py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div className="font-mono text-xs leading-relaxed text-muted-foreground">
                <p className="text-foreground/80">{job.period}</p>
                {job.location && <p>{job.location}</p>}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
                      {job.company} <ArrowUpRight className="size-4 opacity-50" />
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {job.role}
                  {job.summary && <span className="text-muted-foreground/70"> — {job.summary}</span>}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="relative pl-5 leading-relaxed text-pretty text-foreground/80">
                      <span className="absolute top-[0.7em] left-0 h-px w-2.5 bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {job.skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.skills.map((s) => (
                      <TechChip key={s} name={s} />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="border-t border-border pt-10 md:pl-[260px]">
          <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand">
            <FileText className="size-4" /> Full résumé (PDF) <ArrowUpRight className="size-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
