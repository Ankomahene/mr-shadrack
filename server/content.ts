// Project list for meta tags and the sitemap: the bundled content, overlaid with what the admin has
// published in Supabase (refreshed at most every five minutes, and never blocking a request on failure).
import { projects as bundled } from '../src/content/projects.ts';

export interface MetaProject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  updatedAt?: string;
}

const env = process.env;
const supabaseUrl = env.SUPABASE_URL ?? env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

let cache: MetaProject[] = bundled.map((p) => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  description: p.description,
  cover: p.cover,
}));
let fetchedAt = 0;
let inflight: Promise<void> | null = null;

async function refresh() {
  if (!supabaseUrl || !supabaseKey) return;
  const url = `${supabaseUrl}/rest/v1/projects?select=slug,name,tagline,description,image_url,updated_at&is_visible=eq.true&order=display_order`;
  const res = await fetch(url, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return; // e.g. before the v2 migration: keep the bundled list.
  const rows = (await res.json()) as Array<Record<string, string | null>>;
  const fromDb = rows
    .filter((r) => r.slug)
    .map((r) => ({
      slug: r.slug!,
      name: r.name ?? r.slug!,
      tagline: r.tagline ?? '',
      description: r.description ?? '',
      cover: r.image_url ?? '',
      updatedAt: r.updated_at ?? undefined,
    }));
  if (fromDb.length) cache = fromDb;
}

export async function getProjects(): Promise<MetaProject[]> {
  if (Date.now() - fetchedAt > 5 * 60_000 && !inflight) {
    const first = fetchedAt === 0;
    fetchedAt = Date.now();
    inflight = refresh()
      .catch((e) => console.warn('[content] refresh failed:', (e as Error).message))
      .finally(() => (inflight = null));
    // The first request after boot waits (up to the 4s fetch timeout) so a project added in the
    // admin gets the right link preview; later refreshes happen in the background.
    if (first) await inflight;
  }
  return cache;
}

export const supabaseConfig = { url: supabaseUrl, key: supabaseKey };
