import { AnimatePresence, motion } from 'motion/react';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { site } from '../../lib/site.ts';
import { cn } from '../../lib/utils.ts';
import { openCommandMenu } from './CommandMenu.tsx';
import { Kbd, ThemeToggle } from './primitives.tsx';

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#experience', label: 'Experience' },
  { to: '/#about', label: 'About' },
  { to: '/journal', label: 'Journal' },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)} aria-label={`${site.name}, home`}>
      <span className="relative grid size-8 place-items-center rounded-lg bg-foreground font-mono text-[13px] font-semibold text-background transition-transform group-hover:-rotate-6">
        SA
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-brand ring-2 ring-background" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">{site.shortName}</span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu after navigating.
  const [lastLocation, setLastLocation] = useState(pathname + hash);
  if (lastLocation !== pathname + hash) {
    setLastLocation(pathname + hash);
    setOpen(false);
  }

  const isActive = (to: string) => (to.startsWith('/#') ? pathname === '/' && hash === to.slice(1) : pathname.startsWith(to));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || open ? 'border-b border-border bg-background/75 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
                isActive(l.to) && 'text-foreground',
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden h-9 items-center gap-2 rounded-full border border-border bg-background/50 pr-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Search className="size-3.5" />
            <span className="pr-4">Search</span>
            <Kbd>Ctrl K</Kbd>
          </button>
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Search"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground sm:hidden"
          >
            <Search className="size-4" />
          </button>
          <ThemeToggle />
          <Link
            to="/#contact"
            className="ml-1 hidden h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
          >
            Let’s talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full hover:bg-accent md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <div className="container-page flex flex-col gap-1 pt-2 pb-6">
              {[...links, { to: '/#contact', label: 'Contact' }].map((l) => (
                <Link key={l.to} to={l.to} className="rounded-lg py-3 text-2xl font-medium tracking-tight">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
