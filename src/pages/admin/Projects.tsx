import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import { Plus, Trash2, Edit, Link as LinkIcon, MoveUp, MoveDown, Loader2, Upload, AlertCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import JSON5 from 'json5';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  image_url: string;
  tags: string[];
  display_order: number;
}

// Interface for the raw project object from consts.tsx
interface RawProject {
  imageUrl?: string;
  image_url?: string;
  name: string;
  description: string;
  link: string;
  stacks?: string[];
  tags?: string[];
}

export const AdminProjects = () => {
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Bulk Import State
  const [bulkInput, setBulkInput] = useState('');
  const [parsedProjects, setParsedProjects] = useState<Omit<Project, 'id'>[]>([]);
  const [bulkError, setBulkError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    image_url: '',
    tags: '',
    display_order: 0
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Project[];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingProject) {
        const { error } = await supabase.from('projects').update(data).eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsSheetOpen(false);
      resetForm();
    }
  });

  const bulkInsertMutation = useMutation({
    mutationFn: async (projects: Omit<Project, 'id'>[]) => {
      const { error } = await supabase.from('projects').insert(projects);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsBulkImportOpen(false);
      setBulkInput('');
      setParsedProjects([]);
      setBulkError(null);
      alert('Projects imported successfully!');
    },
    onError: (error) => {
      setBulkError(`Import failed: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase.from('projects').update({ display_order: newOrder }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      link: '',
      image_url: '',
      tags: '',
      display_order: 0
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(t => t);

    saveMutation.mutate({
      name: formData.name,
      description: formData.description,
      link: formData.link,
      image_url: formData.image_url,
      tags: tagsArray,
      display_order: parseInt(formData.display_order.toString()) || 0
    });
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      link: project.link || '',
      image_url: project.image_url || '',
      tags: project.tags ? project.tags.join(', ') : '',
      display_order: project.display_order || 0
    });
    setIsSheetOpen(true);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;

    const currentProject = projects[index];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const targetProject = projects[targetIndex];

    // Swap display_order
    reorderMutation.mutate({ id: currentProject.id, newOrder: targetProject.display_order });
    reorderMutation.mutate({ id: targetProject.id, newOrder: currentProject.display_order });
  };

  const handleBulkParse = () => {
    setBulkError(null);
    setParsedProjects([]);

    try {
      // Clean input: remove "export const projects: IProject[] =" part if present
      let cleanInput = bulkInput.trim();
      cleanInput = cleanInput.replace(/export\s+const\s+\w+(\s*:\s*\w+(\[\])?)?\s*=\s*/, '');
      cleanInput = cleanInput.replace(/;$/, ''); // remove trailing semicolon

      const rawData = JSON5.parse(cleanInput);

      if (!Array.isArray(rawData)) {
        throw new Error('Input must be an array of objects.');
      }

      const mappedProjects: Omit<Project, 'id'>[] = rawData.map((item: RawProject, index) => {
        const name = item.name;
        if (!name) throw new Error(`Item at index ${index} is missing a name.`);

        return {
          name: item.name,
          description: item.description || '',
          link: item.link || '',
          image_url: item.imageUrl || item.image_url || '',
          tags: item.stacks || item.tags || [],
          display_order: (projects.length > 0 ? Math.max(...projects.map(p => p.display_order)) : 0) + index + 1
        };
      });

      setParsedProjects(mappedProjects);

    } catch (err: any) {
      setBulkError(err.message || 'Failed to parse input. Please ensure it is a valid JavaScript array or JSON.');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Sheet open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none">
                <Upload className="mr-2 h-4 w-4" /> Bulk Import
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>Bulk Import Projects</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Paste Project Array (JSON or JS Object)</Label>
                  <p className="text-xs text-muted-foreground">
                    Paste the content of your projects array from `consts.tsx`. It handles `imageUrl` to `image_url` and `stacks` to `tags` mapping automatically.
                  </p>
                  <textarea
                    className="flex min-h-50 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="[{ name: 'Project 1', ... }, ...]"
                  />
                </div>

                <Button onClick={handleBulkParse} className="w-full">
                  Parse & Preview
                </Button>

                {bulkError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{bulkError}</AlertDescription>
                  </Alert>
                )}

                {parsedProjects.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Preview ({parsedProjects.length} projects)</h3>
                    </div>
                    <div className="max-h-75 overflow-y-auto space-y-2 border rounded-md p-2">
                      {parsedProjects.map((p, i) => (
                        <div key={i} className="flex gap-2 p-2 border rounded bg-card/50">
                          {p.image_url && <img src={p.image_url} alt="" className="w-10 h-10 object-cover rounded" />}
                          <div className="overflow-hidden">
                            <div className="font-medium truncate">{p.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{p.tags.join(', ')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => bulkInsertMutation.mutate(parsedProjects)}
                      className="w-full"
                      disabled={bulkInsertMutation.isPending}
                    >
                      {bulkInsertMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Import {parsedProjects.length} Projects
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={isSheetOpen} onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) resetForm();
          }}>
            <SheetTrigger asChild>
              <Button onClick={() => resetForm()} className="flex-1 md:flex-none">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSave} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, TypeScript, Tailwind"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={project.id} className="flex flex-col">
              {project.image_url && (
                <div className="h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="truncate" title={project.name}>{project.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveProject(index, 'up')}
                    disabled={index === 0 || reorderMutation.isPending}
                    title="Move Up"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveProject(index, 'down')}
                    disabled={index === projects.length - 1 || reorderMutation.isPending}
                    title="Move Down"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  <Button variant="outline" size="icon" onClick={() => openEdit(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      if (confirm('Delete this project?')) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
