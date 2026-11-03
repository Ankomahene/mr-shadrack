// Public data hooks. Every query starts from the content bundled in src/content, so pages render
// instantly and still work if Supabase is unreachable or not yet migrated; database rows replace
// it once they load, which is how edits made in the admin reach the site.
import { useQuery } from '@tanstack/react-query';
import { experience as bundledExperience } from '../content/experience.ts';
import { projects as bundledProjects } from '../content/projects.ts';
import type { GalleryImage, ProjectCategory } from '../content/types.ts';
import { supabase } from './supabase.ts';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string | null;
  category: ProjectCategory;
  platforms: string[];
  role: string | null;
  year: string | null;
  link: string | null;
  repo: string | null;
  cover: string;
  gallery: GalleryImage[];
  highlights: string[];
  stack: string[];
  accent: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string | null;
  url: string | null;
  summary: string | null;
  points: string[];
  skills: string[];
}

export interface Status {
  text: string;
  link: string | null;
  available: boolean;
  visible: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  date: string;
  category: string | null;
  link: string | null;
  tags: string[];
}

const fallbackProjects: Project[] = bundledProjects.map(({ aliases: _aliases, ...p }) => p);

const fallbackExperience: Experience[] = bundledExperience.map((e, i) => ({
  id: `seed-${i}`,
  company: e.company,
  role: e.role,
  period: e.period,
  location: e.location,
  url: e.url,
  summary: e.summary,
  points: e.points,
  skills: e.skills,
}));

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

function toProject(r: Row): Project {
  const gallery: GalleryImage[] = Array.isArray(r.gallery) ? r.gallery : [];
  return {
    slug: r.slug ?? slugify(r.name),
    name: r.name,
    tagline: r.tagline ?? r.description ?? '',
    description: r.description ?? '',
    overview: r.overview ?? null,
    category: r.category ?? 'side',
    platforms: r.platforms ?? [],
    role: r.role ?? null,
    year: r.year ?? null,
    link: r.link || null,
    repo: r.repo_url || null,
    cover: r.image_url || gallery[0]?.src || '',
    gallery: gallery.length ? gallery : r.image_url ? [{ src: r.image_url, alt: r.name, frame: 'browser' }] : [],
    highlights: r.highlights ?? [],
    stack: r.tags ?? [],
    accent: r.accent || '#d4a017',
    featured: !!r.featured,
  };
}

/** Projects, ordered as in the admin. Pre-migration databases (no slug column) keep the bundled set. */
export function useProjects() {
  return useQuery({
    queryKey: ['public', 'projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data?.length || !('slug' in data[0])) return fallbackProjects;
      // RLS already hides unpublished rows from visitors; this also hides them from a signed-in admin.
      return data.filter((r) => r.is_visible !== false).map(toProject);
    },
    initialData: fallbackProjects,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
  });
}

export function useProject(slug: string | undefined) {
  const { data, ...rest } = useProjects();
  return { ...rest, data: data.find((p) => p.slug === slug) ?? null, all: data };
}

export function useExperience() {
  return useQuery({
    queryKey: ['public', 'experience'],
    queryFn: async (): Promise<Experience[]> => {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data?.length || !('summary' in data[0])) return fallbackExperience;
      return data.map((r: Row) => ({
        id: r.id,
        company: r.company,
        role: r.role,
        period: r.period,
        location: r.location ?? null,
        url: r.company_url ?? null,
        summary: r.summary ?? null,
        points: r.description ?? [],
        skills: r.skills ?? [],
      }));
    },
    initialData: fallbackExperience,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
  });
}

export function useStatus() {
  return useQuery({
    queryKey: ['public', 'status'],
    queryFn: async (): Promise<Status | null> => {
      const { data } = await supabase.from('profile_status').select('*').limit(1).maybeSingle();
      if (!data) return null;
      return {
        text: data.status_text,
        link: data.project_link || null,
        available: !!data.is_available,
        visible: data.is_visible ?? true,
      };
    },
    staleTime: 5 * 60_000,
  });
}

export function useJournal() {
  return useQuery({
    queryKey: ['public', 'journal'],
    queryFn: async (): Promise<JournalEntry[]> => {
      const { data, error } = await supabase
        .from('year_in_review')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r: Row) => ({
        id: r.id,
        title: r.title,
        body: r.description ?? '',
        date: r.date,
        category: r.category ?? null,
        link: r.media_url || null,
        tags: r.tags ?? [],
      }));
    },
    staleTime: 5 * 60_000,
  });
}
