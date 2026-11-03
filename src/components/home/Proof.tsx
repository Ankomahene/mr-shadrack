import { Reveal } from '../site/primitives.tsx';

const stats = [
  { value: '6+', label: 'years shipping production software' },
  { value: '5', label: 'years on Morgan Stanley’s API platforms' },
  { value: '6', label: 'products built and launched since 2025' },
  { value: '3', label: 'platforms: web, desktop and Android' },
];

const names = [
  'Morgan Stanley',
  'Turntabl',
  'KreeoAI',
  'Ndel Technologies',
  'BawaHealth',
  'Voltbase',
  'FMT Software',
  'Judey Phones',
  'iSMART',
  'Africa Is Great',
  'Dronehub Africa',
];

export function Proof() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="container-page grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="px-1 py-8 md:px-8 md:first:pl-0">
            <p className="text-4xl font-semibold tracking-tight md:text-5xl">
              {s.value}
              <span className="text-brand">.</span>
            </p>
            <p className="mt-2 max-w-[16ch] text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
      <div className="mask-fade-x overflow-hidden border-t border-border py-5">
        <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
          {[...names, ...names].map((n, i) => (
            <span
              key={i}
              className="font-mono text-sm tracking-tight whitespace-nowrap text-muted-foreground/80"
              aria-hidden={i >= names.length}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
