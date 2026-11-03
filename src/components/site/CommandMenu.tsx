import { Command } from 'cmdk';
import {
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Monitor,
  Moon,
  NotebookPen,
  Sun,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useProjects } from '../../lib/data.ts';
import { site } from '../../lib/site.ts';
import { setTheme } from '../../lib/theme.ts';
import { Kbd } from './primitives.tsx';

export const openCommandMenu = () => window.dispatchEvent(new Event('command-menu:open'));

const itemClass =
  'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 data-[selected=true]:bg-accent data-[selected=true]:text-foreground [&_svg]:size-4 [&_svg]:text-muted-foreground';
const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { data: projects } = useProjects();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('command-menu:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('command-menu:open', onOpen);
    };
  }, []);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };
  const go = (to: string) => run(() => navigate(to));
  const external = (url: string) => run(() => window.open(url, '_blank', 'noopener'));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      loop
      overlayClassName="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0"
      contentClassName="fixed top-[14vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-float data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <span className="font-mono text-sm text-brand">›</span>
        <Command.Input
          placeholder="Search projects, pages, links…"
          className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        />
        <Kbd>Esc</Kbd>
      </div>
      <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2">
        <Command.Empty className="py-10 text-center text-sm text-muted-foreground">No results.</Command.Empty>

        <Command.Group heading="Go to" className={groupClass}>
          <Command.Item className={itemClass} onSelect={go('/')}>
            <Home /> Home
          </Command.Item>
          <Command.Item className={itemClass} onSelect={go('/#work')}>
            <FolderGit2 /> Work
          </Command.Item>
          <Command.Item className={itemClass} onSelect={go('/#experience')}>
            <Briefcase /> Experience
          </Command.Item>
          <Command.Item className={itemClass} onSelect={go('/#about')}>
            <User /> About
          </Command.Item>
          <Command.Item className={itemClass} onSelect={go('/journal')}>
            <NotebookPen /> Journal
          </Command.Item>
          <Command.Item className={itemClass} onSelect={go('/#contact')}>
            <Mail /> Contact
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((p) => (
            <Command.Item
              key={p.slug}
              value={`${p.name} ${p.tagline} ${p.stack.join(' ')}`}
              className={itemClass}
              onSelect={go(`/work/${p.slug}`)}
            >
              <span className="size-2 shrink-0 rounded-full" style={{ background: p.accent }} />
              <span className="truncate">{p.name}</span>
              <span className="ml-auto hidden truncate text-xs text-muted-foreground sm:block">{p.tagline}</span>
              <ArrowRight className="shrink-0" />
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Links" className={groupClass}>
          <Command.Item
            className={itemClass}
            onSelect={() => {
              void navigator.clipboard.writeText(site.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }}
          >
            {copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy email address'}
          </Command.Item>
          <Command.Item className={itemClass} onSelect={external(site.cv)}>
            <FileText /> Download CV
          </Command.Item>
          <Command.Item className={itemClass} onSelect={external(site.socials.github)}>
            <FaGithub /> GitHub
          </Command.Item>
          <Command.Item className={itemClass} onSelect={external(site.socials.linkedin)}>
            <FaLinkedin /> LinkedIn
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Theme" className={groupClass}>
          <Command.Item className={itemClass} onSelect={run(() => setTheme('dark'))}>
            <Moon /> Dark
          </Command.Item>
          <Command.Item className={itemClass} onSelect={run(() => setTheme('light'))}>
            <Sun /> Light
          </Command.Item>
          <Command.Item className={itemClass} onSelect={run(() => setTheme('system'))}>
            <Monitor /> System
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
