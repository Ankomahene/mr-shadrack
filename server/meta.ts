// Head tags per route, written into index.html between <!--seo--> and <!--/seo--> so crawlers and
// link-preview bots (which don't run JavaScript) see the right title, description and image.
import { site } from '../src/lib/site.ts';
import type { MetaProject } from './content.ts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  jsonLd?: object[];
}

export function renderHead(m: PageMeta, origin: string = site.url) {
  const url = origin + m.path;
  const image = m.image.startsWith('http') ? m.image : origin + m.image;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta property="og:type" content="${m.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:secure_url" content="${esc(image)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(m.imageAlt)}" />`,
    ...(m.jsonLd ?? []).map(
      (j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.join('\n    ');
}

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}/photo.webp`,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressCountry: 'GH' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Cape Coast' },
  knowsAbout: ['React', 'TypeScript', 'Angular', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Electron', 'Kotlin'],
  sameAs: [site.socials.github, site.socials.linkedin],
};

export const homeMeta: PageMeta = {
  title: site.title,
  description: site.description,
  path: '/',
  image: site.ogImage,
  imageAlt: `${site.name}, ${site.role}`,
  type: 'profile',
  jsonLd: [
    person,
    { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, author: { '@id': person['@id'] } },
  ],
};

export function projectMeta(p: MetaProject): PageMeta {
  return {
    title: `${p.name} — ${p.tagline} · ${site.name}`,
    description: p.description,
    path: `/work/${p.slug}`,
    image: `/og/${p.slug}.jpg`,
    imageAlt: `${p.name}: ${p.tagline}`,
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.name,
        headline: p.tagline,
        description: p.description,
        url: `${site.url}/work/${p.slug}`,
        image: `${site.url}/og/${p.slug}.jpg`,
        creator: { '@id': person['@id'] },
        author: person,
      },
    ],
  };
}

export const journalMeta: PageMeta = {
  title: `Journal · ${site.name}`,
  description: 'Work, life and lessons from the year — notes by Shadrack Ankomahene.',
  path: '/journal',
  image: site.ogImage,
  imageAlt: `${site.name}, ${site.role}`,
};

export const notFoundMeta = (path: string): PageMeta => ({
  ...homeMeta,
  title: `Not found · ${site.name}`,
  path,
  noindex: true,
  jsonLd: [],
});

export const adminMeta: PageMeta = { ...homeMeta, title: `Admin · ${site.name}`, path: '/admin', noindex: true, jsonLd: [] };
