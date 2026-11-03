// POST /api/contact: validates, saves the message to Supabase and emails it to me.
import type { Context } from 'hono';
import { Resend } from 'resend';
import { supabaseConfig } from './content.ts';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = process.env.CONTACT_FROM ?? 'Portfolio <contact@mrshadrack.site>';
const to = (process.env.CONTACT_TO ?? 'ankomaheneshadrack@gmail.com').split(',').map((s) => s.trim());

// Five messages per address per ten minutes is plenty for a person and useless for a bot.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function contact(c: Context) {
  const ip = c.req.header('x-forwarded-for')?.split(',')[0].trim() ?? 'local';
  if (limited(ip)) return c.json({ error: 'Too many messages. Please try again later.' }, 429);

  const body = (await c.req.json().catch(() => null)) as Record<string, unknown> | null;
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body?.name);
  const email = str(body?.email);
  const message = str(body?.message);

  // Honeypot filled in: pretend it worked.
  if (str(body?.company)) return c.json({ ok: true });

  if (!name || name.length > 120) return c.json({ error: 'Please add your name.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return c.json({ error: 'Please use a valid email address.' }, 400);
  if (!message || message.length > 5000) return c.json({ error: 'Please write a message (up to 5000 characters).' }, 400);

  let saved = false;
  if (supabaseConfig.url && supabaseConfig.key) {
    const res = await fetch(`${supabaseConfig.url}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        apikey: supabaseConfig.key,
        Authorization: `Bearer ${supabaseConfig.key}`,
        'content-type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ name, email, message }),
    }).catch((e: Error) => {
      console.error('[contact] save failed:', e.message);
      return null;
    });
    saved = !!res?.ok;
    if (res && !res.ok) console.error('[contact] save failed:', res.status, await res.text());
  }

  let emailed = false;
  if (resend) {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name.slice(0, 60)} via mrshadrack.site`,
      text: `${name} <${email}>\n\n${message}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    emailed = !error;
    if (error) console.error('[contact] email failed:', error.message);
  }

  if (!saved && !emailed) return c.json({ error: 'Could not send right now. Please email me directly.' }, 503);
  return c.json({ ok: true });
}
