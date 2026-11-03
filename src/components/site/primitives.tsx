import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme.ts';
import { cn } from '../../lib/utils.ts';

/** Fades content up the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  children,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn('mb-12 max-w-2xl md:mb-16', className)}>
      <p className="eyebrow mb-4">
        <span className="text-brand">{index}</span> / {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.05]">{title}</h2>
      {children && <p className="mt-5 text-lg text-pretty text-muted-foreground">{children}</p>}
    </Reveal>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme: current, setTheme } = useTheme();
  const order = ['dark', 'light', 'system'] as const;
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = current === 'light' ? Sun : current === 'system' ? Monitor : Moon;
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}`}
      title={`Theme: ${current}`}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
