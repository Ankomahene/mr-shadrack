export type ProjectCategory = 'product' | 'client' | 'side';

export interface GalleryImage {
  src: string;
  alt: string;
  /** How the screenshot is presented: a browser window, a desktop app window, a phone, or as-is. */
  frame: 'browser' | 'desktop' | 'phone' | 'none';
}

/** Project as authored in src/content/projects.ts. */
export interface ProjectSeed {
  slug: string;
  name: string;
  /** Older names used by rows that predate slugs, so the migration can match them. */
  aliases?: string[];
  tagline: string;
  description: string;
  overview: string | null;
  category: ProjectCategory;
  platforms: string[];
  role: string;
  year: string;
  link: string | null;
  repo: string | null;
  cover: string;
  gallery: GalleryImage[];
  highlights: string[];
  stack: string[];
  accent: string;
  featured: boolean;
}

export interface ExperienceSeed {
  company: string;
  role: string;
  period: string;
  location: string | null;
  url: string | null;
  summary: string | null;
  points: string[];
  skills: string[];
}
