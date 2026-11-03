import { ArrowRight, Check, Copy, Loader2, Mail } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { site } from '../../lib/site.ts';
import { supabase } from '../../lib/supabase.ts';
import { Reveal } from '../site/primitives.tsx';
import { Button } from '../ui/button.tsx';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/** Sends through the server (saves the message and emails me). Without the server — `vite` on its
 * own — the message is still saved straight to Supabase. */
async function send(payload: { name: string; email: string; message: string; company: string }) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return;
    // The server only answers 400 (invalid) or 429 (too many). Anything else means no server here.
    if (res.status === 400 || res.status === 429) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Something went wrong. Please email me instead.');
    }
  } catch (e) {
    if (e instanceof Error && !(e instanceof TypeError)) throw e;
  }
  const { error } = await supabase
    .from('messages')
    .insert([{ name: payload.name, email: payload.email, message: payload.message }]);
  if (error) throw new Error('Something went wrong. Please email me instead.');
}

const field =
  'w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-[15px] transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-foreground/30 focus:bg-background';

export function Contact() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ kind: 'sending' });
    try {
      await send({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        company: data.company ?? '',
      });
      form.reset();
      setState({ kind: 'sent' });
    } catch (err) {
      setState({ kind: 'error', message: (err as Error).message });
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand/12 blur-[120px]" />
      <div className="container-page relative grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">
            <span className="text-brand">04</span> / Contact
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.02]">
            Have something in mind? Let’s build it.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            I’m open to full-time remote roles and select contracts. Tell me what you’re working on.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 py-2 pr-2 pl-4 text-sm backdrop-blur hover:border-foreground/30"
            >
              <Mail className="size-4 text-brand" />
              {site.email}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  void navigator.clipboard.writeText(site.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                }}
                aria-label="Copy email address"
                className="grid size-7 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </button>
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
            >
              <FaLinkedin className="size-4" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
            >
              <FaGithub className="size-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {state.kind === 'sent' ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-[1.75rem] border border-border bg-card/70 p-10 text-center backdrop-blur">
              <div className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Check className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
              <p className="mt-2 text-muted-foreground">Thanks. I’ll reply within a day or two.</p>
              <Button variant="ghost" className="mt-6" onClick={() => setState({ kind: 'idle' })}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-soft backdrop-blur sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Name</span>
                  <input name="name" required maxLength={120} autoComplete="name" className={field} placeholder="Ama Mensah" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    className={field}
                    placeholder="ama@company.com"
                  />
                </label>
              </div>
              {/* Honeypot: hidden from people, irresistible to bots. */}
              <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  maxLength={5000}
                  rows={6}
                  className={`${field} resize-none`}
                  placeholder="A role, a product, a problem…"
                />
              </label>
              {state.kind === 'error' && <p className="text-sm text-destructive">{state.message}</p>}
              <Button type="submit" variant="brand" size="lg" className="w-full" disabled={state.kind === 'sending'}>
                {state.kind === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
