// Production server for Railway: serves the built site, writes per-page meta tags for crawlers and
// link previews, and handles the contact form. Runs directly on Node 24 (`node server/index.ts`).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { secureHeaders } from 'hono/secure-headers';
import { site } from '../src/lib/site.ts';
import { contact } from './contact.ts';
import { getProjects } from './content.ts';
import { adminMeta, homeMeta, journalMeta, notFoundMeta, type PageMeta, projectMeta, renderHead } from './meta.ts';

const root = join(import.meta.dirname, '..', 'dist');
const origin = (process.env.SITE_URL ?? site.url).replace(/\/$/, '');
const template = readFileSync(join(root, 'index.html'), 'utf8');
if (!template.includes('<!--seo-->')) throw new Error('dist/index.html is missing the <!--seo--> block');

const page = (meta: PageMeta) => template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, renderHead(meta, origin));

const app = new Hono();

// One canonical host: www and the railway.app address redirect to the custom domain.
app.use('*', async (c, next) => {
  const host = c.req.header('host') ?? '';
  const canonicalHost = new URL(origin).host;
  if (process.env.NODE_ENV === 'production' && host !== canonicalHost && !host.startsWith('localhost') && c.req.path !== '/healthz') {
    if (host.startsWith('www.') || host.endsWith('.up.railway.app')) {
      const url = new URL(c.req.url);
      return c.redirect(`${origin}${url.pathname}${url.search}`, 301);
    }
  }
  await next();
});

app.use(
  '*',
  secureHeaders({
    contentSecurityPolicy: undefined,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: 'cross-origin',
    referrerPolicy: 'strict-origin-when-cross-origin',
    strictTransportSecurity: 'max-age=31536000; includeSubDomains',
    xFrameOptions: 'DENY',
    permissionsPolicy: { camera: [], microphone: [], geolocation: [] },
  }),
);
app.use('*', compress());

app.get('/healthz', (c) => c.text('ok'));
app.post('/api/contact', contact);

app.get('/robots.txt', (c) =>
  c.text(`User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${origin}/sitemap.xml\n`),
);

app.get('/sitemap.xml', async (c) => {
  const projects = await getProjects();
  const urls = [
    { loc: '/', priority: '1.0' },
    { loc: '/journal', priority: '0.5' },
    ...projects.map((p) => ({ loc: `/work/${p.slug}`, priority: '0.8', lastmod: p.updatedAt?.slice(0, 10) })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${origin}${u.loc}</loc>${'lastmod' in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`,
    )
    .join('\n');
  c.header('content-type', 'application/xml; charset=utf-8');
  c.header('cache-control', 'public, max-age=3600');
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
});

// Static files. Hashed bundles never change; screenshots and preview images rarely do.
app.use(
  '*',
  serveStatic({
    root: './dist',
    rewriteRequestPath: (p) => (p === '/' || p === '/index.html' ? '/__none__' : p),
    onFound: (file, c) => {
      const path = file.replace(/\\/g, '/');
      if (path.includes('/assets/')) c.header('cache-control', 'public, max-age=31536000, immutable');
      else if (/\/(work|og)\//.test(path) || /\.(webp|jpg|png|svg|ico|woff2|pdf)$/.test(path))
        c.header('cache-control', 'public, max-age=604800, stale-while-revalidate=86400');
      else c.header('cache-control', 'public, max-age=3600');
    },
  }),
);

// Social preview images for projects added later in the admin fall back to the default card.
app.get('/og/:file', (c) => c.redirect(site.ogImage, 302));

// Everything else is the single-page app, with the right head tags and status code.
app.get('*', async (c) => {
  const path = c.req.path.replace(/\/$/, '') || '/';
  let meta: PageMeta | null = null;
  if (path === '/') meta = homeMeta;
  else if (path === '/journal') meta = journalMeta;
  else if (path === '/year-in-review') return c.redirect('/journal', 301);
  else if (path === '/ui-designs') return c.redirect('/#work', 301);
  else if (path.startsWith('/admin')) meta = adminMeta;
  else if (path.startsWith('/work/')) {
    const project = (await getProjects()).find((p) => p.slug === path.slice(6));
    if (project) meta = projectMeta(project);
  }
  c.header('cache-control', 'no-cache');
  if (path.startsWith('/admin')) c.header('x-robots-tag', 'noindex, nofollow');
  return meta ? c.html(page(meta)) : c.html(page(notFoundMeta(path)), 404);
});

const port = Number(process.env.PORT ?? 8080);
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, () => {
  console.log(`mr-shadrack listening on :${port} (${existsSync(root) ? 'dist ok' : 'dist missing'})`);
});
