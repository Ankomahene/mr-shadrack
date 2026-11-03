import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Plus,
  Star,
  Trash2,
  Upload,
} from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { GalleryImage, ProjectCategory } from '../../content/types.ts';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { supabase } from '../../lib/supabase.ts';
import { cn } from '../../lib/utils.ts';

interface ProjectRow {
  id: string;
  slug: string | null;
  name: string;
  tagline: string | null;
  description: string | null;
  overview: string | null;
  category: ProjectCategory;
  platforms: string[];
  role: string | null;
  year: string | null;
  link: string | null;
  repo_url: string | null;
  image_url: string | null;
  gallery: GalleryImage[];
  highlights: string[];
  tags: string[];
  accent: string | null;
  featured: boolean;
  is_visible: boolean;
  display_order: number;
}

interface Form {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  overview: string;
  category: ProjectCategory;
  platforms: string;
  role: string;
  year: string;
  link: string;
  repo_url: string;
  image_url: string;
  gallery: GalleryImage[];
  highlights: string;
  tags: string;
  accent: string;
  featured: boolean;
  is_visible: boolean;
}

const empty: Form = {
  name: '',
  slug: '',
  tagline: '',
  description: '',
  overview: '',
  category: 'product',
  platforms: 'Web',
  role: '',
  year: String(new Date().getFullYear()),
  link: '',
  repo_url: '',
  image_url: '',
  gallery: [],
  highlights: '',
  tags: '',
  accent: '#d4a017',
  featured: false,
  is_visible: true,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const list = (s: string, sep: string | RegExp = ',') =>
  s
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean);

const categories: { id: ProjectCategory; label: string }[] = [
  { id: 'product', label: 'Product' },
  { id: 'client', label: 'Client' },
  { id: 'side', label: 'Side project' },
];
const frames: GalleryImage['frame'][] = ['browser', 'desktop', 'phone', 'none'];

const selectClass =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

async function uploadImage(file: File, slug: string) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'webp';
  const path = `projects/${slug || 'misc'}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage.from('portfolio').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
  });
  if (error) throw error;
  return supabase.storage.from('portfolio').getPublicUrl(path).data.publicUrl;
}

export const AdminProjects = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [newUrl, setNewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: projects = [], isLoading, error: loadError } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      return data as ProjectRow[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
    qc.invalidateQueries({ queryKey: ['public', 'projects'] });
  };

  const save = useMutation({
    mutationFn: async (row: Partial<ProjectRow>) => {
      const q = editing
        ? supabase.from('projects').update(row).eq('id', editing.id)
        : supabase.from('projects').insert([{ ...row, display_order: (projects.at(-1)?.display_order ?? 0) + 1 }]);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      setOpen(false);
    },
    onError: (e: Error) => setError(e.message),
  });

  const patch = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<ProjectRow> }) => {
      const { error } = await supabase.from('projects').update(values).eq('id', id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const move = async (index: number, dir: -1 | 1) => {
    const a = projects[index];
    const b = projects[index + dir];
    if (!a || !b) return;
    // Orders can collide on older rows, so write explicit positions.
    await Promise.all([
      supabase.from('projects').update({ display_order: index + dir + 1 }).eq('id', a.id),
      supabase.from('projects').update({ display_order: index + 1 }).eq('id', b.id),
    ]);
    invalidate();
  };

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
    setOpen(true);
  };

  const openEdit = (p: ProjectRow) => {
    setEditing(p);
    setError(null);
    setForm({
      name: p.name,
      slug: p.slug ?? slugify(p.name),
      tagline: p.tagline ?? '',
      description: p.description ?? '',
      overview: p.overview ?? '',
      category: p.category ?? 'side',
      platforms: (p.platforms ?? []).join(', '),
      role: p.role ?? '',
      year: p.year ?? '',
      link: p.link ?? '',
      repo_url: p.repo_url ?? '',
      image_url: p.image_url ?? '',
      gallery: p.gallery ?? [],
      highlights: (p.highlights ?? []).join('\n'),
      tags: (p.tags ?? []).join(', '),
      accent: p.accent ?? '#d4a017',
      featured: !!p.featured,
      is_visible: p.is_visible ?? true,
    });
    setOpen(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const slug = slugify(form.slug || form.name);
    const gallery = form.gallery.filter((g) => g.src);
    save.mutate({
      name: form.name.trim(),
      slug,
      tagline: form.tagline.trim() || null,
      description: form.description.trim(),
      overview: form.overview.trim() || null,
      category: form.category,
      platforms: list(form.platforms),
      role: form.role.trim() || null,
      year: form.year.trim() || null,
      link: form.link.trim(),
      repo_url: form.repo_url.trim() || null,
      image_url: form.image_url || gallery[0]?.src || null,
      gallery,
      highlights: list(form.highlights, /\n/),
      tags: list(form.tags),
      accent: form.accent,
      featured: form.featured,
      is_visible: form.is_visible,
    });
  };

  const setGallery = (gallery: GalleryImage[]) => setForm((f) => ({ ...f, gallery }));
  const addImage = (src: string) =>
    setForm((f) => ({
      ...f,
      gallery: [...f.gallery, { src, alt: f.name || 'Screenshot', frame: 'browser' }],
      image_url: f.image_url || src,
    }));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) addImage(await uploadImage(file, slugify(form.slug || form.name)));
    } catch (e) {
      setError(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            {projects.filter((p) => p.is_visible !== false).length} live · {projects.filter((p) => p.featured).length} featured
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus /> New project
        </Button>
      </div>

      {loadError && <p className="text-sm text-destructive">{(loadError as Error).message}</p>}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {projects.map((p, i) => {
            const visible = p.is_visible !== false;
            return (
              <div key={p.id} className={cn('flex items-center gap-4 bg-card p-3 sm:p-4', !visible && 'opacity-50')}>
                <div className="flex flex-col">
                  <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30" aria-label="Move up">
                    <ArrowUp className="size-4" />
                  </button>
                  <button type="button" disabled={i === projects.length - 1} onClick={() => move(i, 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30" aria-label="Move down">
                    <ArrowDown className="size-4" />
                  </button>
                </div>
                <div className="hidden h-14 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:block">
                  {p.image_url && <img src={p.image_url.replace(/\.webp$/, '-sm.webp')} onError={(e) => ((e.target as HTMLImageElement).src = p.image_url!)} alt="" className="size-full object-cover object-top" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: p.accent ?? '#888' }} />
                    <span className="font-medium">{p.name}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {p.category ?? 'side'}
                    </Badge>
                    {!p.slug && (
                      <Badge variant="secondary" className="text-[10px]">
                        no slug
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{p.tagline || p.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title={p.featured ? 'Featured' : 'Feature it'}
                    onClick={() => patch.mutate({ id: p.id, values: { featured: !p.featured } })}
                  >
                    <Star className={cn(p.featured && 'fill-amber-400 text-amber-400')} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title={visible ? 'Visible' : 'Hidden'}
                    onClick={() => patch.mutate({ id: p.id, values: { is_visible: !visible } })}
                  >
                    {visible ? <Eye /> : <EyeOff />}
                  </Button>
                  {p.slug && (
                    <Button variant="ghost" size="icon-sm" asChild title="View on site">
                      <a href={`/work/${p.slug}`} target="_blank" rel="noreferrer">
                        <ExternalLink />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon-sm" title="Edit" onClick={() => openEdit(p)}>
                    <Edit />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Delete"
                    className="text-destructive"
                    onClick={() => confirm(`Delete ${p.name}?`) && remove.mutate(p.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}
          {!projects.length && <p className="p-10 text-center text-muted-foreground">No projects</p>}
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{editing ? `Edit ${editing.name}` : 'New project'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={onSubmit} className="mt-6 space-y-5 px-1 pb-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => set('name')(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={form.slug} placeholder={slugify(form.name)} onChange={(e) => set('slug')(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={form.tagline} onChange={(e) => set('tagline')(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Summary</Label>
              <Textarea id="description" rows={3} required value={form.description} onChange={(e) => set('description')(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overview">Case study</Label>
              <Textarea id="overview" rows={6} value={form.overview} onChange={(e) => set('overview')(e.target.value)} placeholder="Paragraphs separated by a blank line" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (one per line)</Label>
              <Textarea id="highlights" rows={4} value={form.highlights} onChange={(e) => set('highlights')(e.target.value)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">Type</Label>
                <select id="category" className={selectClass} value={form.category} onChange={(e) => set('category')(e.target.value as ProjectCategory)}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" value={form.year} onChange={(e) => set('year')(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent">Accent</Label>
                <div className="flex gap-2">
                  <input type="color" value={form.accent} onChange={(e) => set('accent')(e.target.value)} className="h-10 w-12 cursor-pointer rounded-md border border-input bg-background p-1" />
                  <Input id="accent" value={form.accent} onChange={(e) => set('accent')(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={form.role} onChange={(e) => set('role')(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platforms">Platforms</Label>
                <Input id="platforms" value={form.platforms} onChange={(e) => set('platforms')(e.target.value)} placeholder="Web, Desktop, Android" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Stack</Label>
              <Input id="tags" value={form.tags} onChange={(e) => set('tags')(e.target.value)} placeholder="React, TypeScript, Supabase" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="link">Live URL</Label>
                <Input id="link" type="url" value={form.link} onChange={(e) => set('link')(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo">Repository</Label>
                <Input id="repo" type="url" value={form.repo_url} onChange={(e) => set('repo_url')(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 rounded-lg border border-border p-4">
              <label className="flex items-center gap-3 text-sm">
                <Switch checked={form.featured} onCheckedChange={set('featured')} /> Featured
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Switch checked={form.is_visible} onCheckedChange={set('is_visible')} /> Visible
              </label>
            </div>

            <div className="space-y-3">
              <Label>Gallery</Label>
              <div className="space-y-2">
                {form.gallery.map((g, i) => (
                  <div key={`${g.src}-${i}`} className={cn('flex gap-3 rounded-lg border p-2', form.image_url === g.src ? 'border-amber-400' : 'border-border')}>
                    <img src={g.src} alt="" className="h-16 w-24 shrink-0 rounded object-cover object-top" />
                    <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[1fr_120px]">
                      <Input
                        value={g.alt}
                        placeholder="Caption"
                        onChange={(e) => setGallery(form.gallery.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                      />
                      <select
                        className={selectClass}
                        value={g.frame}
                        onChange={(e) =>
                          setGallery(form.gallery.map((x, j) => (j === i ? { ...x, frame: e.target.value as GalleryImage['frame'] } : x)))
                        }
                      >
                        {frames.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button type="button" variant="ghost" size="icon-sm" title="Use as cover" onClick={() => set('image_url')(g.src)}>
                        <Star className={cn(form.image_url === g.src && 'fill-amber-400 text-amber-400')} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        title="Move up"
                        disabled={i === 0}
                        onClick={() => {
                          const next = [...form.gallery];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          setGallery(next);
                        }}
                      >
                        <ArrowUp />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm" title="Remove" onClick={() => setGallery(form.gallery.filter((_, j) => j !== i))}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Image URL or /work/slug/file.webp" />
                <Button
                  type="button"
                  variant="outline"
                  disabled={!newUrl.trim()}
                  onClick={() => {
                    addImage(newUrl.trim());
                    setNewUrl('');
                  }}
                >
                  <ImagePlus /> Add
                </Button>
                <Button type="button" variant="outline" asChild disabled={uploading}>
                  <label className="cursor-pointer">
                    {uploading ? <Loader2 className="animate-spin" /> : <Upload />} Upload
                    <input type="file" accept="image/webp,image/png,image/jpeg,image/avif" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
                  </label>
                </Button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={save.isPending}>
              {save.isPending && <Loader2 className="animate-spin" />}
              {editing ? 'Save changes' : 'Create project'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
