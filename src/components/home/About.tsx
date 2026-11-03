import { GraduationCap, MapPin, Presentation, Users } from 'lucide-react';
import { site } from '../../lib/site.ts';
import { Reveal, SectionHeading } from '../site/primitives.tsx';
import { techIcon } from '../site/tech.tsx';

const toolbox = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Angular', 'Tailwind CSS', 'TanStack Query', 'RxJS', 'Vite'],
  },
  {
    title: 'Backend & data',
    items: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Prisma', 'Redis', 'Firebase', 'Sanity'],
  },
  {
    title: 'Desktop & mobile',
    items: ['Electron', 'Expo', 'React Native', 'Kotlin', 'Jetpack Compose', 'Tauri'],
  },
  {
    title: 'Shipping',
    items: ['Docker', 'Railway', 'GitHub Actions', 'Vitest', 'Jest', 'Cypress', 'Azure', 'AWS'],
  },
];

const facts = [
  { icon: MapPin, label: 'Based in', value: `${site.location} · ${site.timezone}` },
  { icon: GraduationCap, label: 'Education', value: 'B.Ed. Computer Science, University of Cape Coast' },
  { icon: Presentation, label: 'Teaching', value: 'Instructor, Global Code at the University of Ghana (2019)' },
  { icon: Users, label: 'Community', value: 'Co-lead, Developer Student Club, UCC (2018–19)' },
];

export function About() {
  return (
    <section id="about" className="container-page py-24 md:py-32">
      <SectionHeading index="03" label="About" title="Engineer first, founder by necessity." />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
            <img
              src="/photo.webp"
              alt="Portrait of Shadrack Ankomahene"
              width={720}
              height={720}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover grayscale contrast-[1.05] dark:brightness-90"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6 pt-20">
              <p className="font-mono text-xs text-muted-foreground">~/shadrack</p>
              <p className="mt-1 font-medium">Usually building, teaching, or both.</p>
            </div>
          </div>
          <dl className="mt-6 space-y-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3.5">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand" />
                <div>
                  <dt className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-pretty text-foreground/85">
            <p>
              I spent five years at Turntabl on assignment with Morgan Stanley, building the frontend of an enterprise
              API marketplace and developer portal: deployment tooling, usage dashboards, shared Angular libraries, and
              the tests and pipelines around them. Along the way I trained and mentored engineers in React and
              TypeScript.
            </p>
            <p>
              Since 2025 I’ve been building my own products under{' '}
              <a href="https://fmtsoftware.com" target="_blank" rel="noreferrer" className="link-underline text-foreground">
                FMT Software Solutions
              </a>{' '}
              — software that print shops, retailers, churches and a phone seller run their day on — while contracting
              for startups in health, design tooling and property management.
            </p>
            <p className="text-muted-foreground">
              I care about software that holds up in the real world: money that adds up the same on every screen, apps
              that stay fast on slow connections, and interfaces simple enough that nobody needs training.
            </p>
          </Reveal>

          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2">
            {toolbox.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-card/50 p-5">
                <p className="eyebrow mb-4">{group.title}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {group.items.map((item) => {
                    const Icon = techIcon(item);
                    return (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        {Icon && <Icon className="size-3.5 text-muted-foreground" aria-hidden />}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
