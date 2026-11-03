import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import { site } from '../../lib/site.ts';
import { openCommandMenu } from './CommandMenu.tsx';
import { Kbd } from './primitives.tsx';
import { Logo } from './Nav.tsx';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            {site.role} in {site.location}. Building software businesses run on.
          </p>
          <button
            type="button"
            onClick={openCommandMenu}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Press <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd> to get around
          </button>
        </div>
        <div>
          <p className="eyebrow mb-4">Site</p>
          <ul className="space-y-2.5 text-sm">
            {[
              ['/#work', 'Work'],
              ['/#experience', 'Experience'],
              ['/#about', 'About'],
              ['/journal', 'Journal'],
              ['/#contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <FaGithub /> GitHub <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <FaLinkedin /> LinkedIn <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a href={site.cv} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                CV (PDF) <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-border py-6 font-mono text-[11px] text-muted-foreground sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>React · Vite · Tailwind · Supabase · Railway</span>
      </div>
    </footer>
  );
}
