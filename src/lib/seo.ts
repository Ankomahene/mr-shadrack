// Keeps the document head in step with client-side navigation. The server writes the same tags
// into the HTML for crawlers and link previews (server/meta.ts), so they agree on first load.
import { useEffect } from 'react';
import { site } from './site.ts';

interface Seo {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export function useSeo({ title, description = site.description, path = '/', image = site.ogImage, noindex }: Seo) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : site.title;
    const url = site.url + path;
    const img = image.startsWith('http') ? image : site.url + image;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, path, image, noindex]);
}
