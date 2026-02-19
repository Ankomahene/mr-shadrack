import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea'; // Assuming Textarea component exists, if not I'll use native textarea or Input
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import { Plus, Trash2, Edit, MoveUp, MoveDown, Loader2, Upload, AlertCircle, Briefcase, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import JSON5 from 'json5';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';

interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  display_order: number;
}

// Interface for the raw job object for bulk import
interface RawJob {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export const AdminWorkExperience = () => {
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Bulk Import State
  const [bulkInput, setBulkInput] = useState('');
  const [parsedJobs, setParsedJobs] = useState<Omit<Job, 'id'>[]>([]);
  const [bulkError, setBulkError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    description: '', // We'll handle this as newline separated string in form
    skills: '', // Comma separated
    display_order: 0
  });

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['work_experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Job[];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingJob) {
        const { error } = await supabase.from('work_experiences').update(data).eq('id', editingJob.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('work_experiences').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_experiences'] });
      setIsSheetOpen(false);
      resetForm();
    }
  });

  const bulkInsertMutation = useMutation({
    mutationFn: async (jobs: Omit<Job, 'id'>[]) => {
      const { error } = await supabase.from('work_experiences').insert(jobs);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_experiences'] });
      setIsBulkImportOpen(false);
      setBulkInput('');
      setParsedJobs([]);
      setBulkError(null);
      alert('Work experiences imported successfully!');
    },
    onError: (error) => {
      setBulkError(`Import failed: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('work_experiences').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_experiences'] });
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase.from('work_experiences').update({ display_order: newOrder }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_experiences'] });
    }
  });

  const resetForm = () => {
    setEditingJob(null);
    setFormData({
      company: '',
      role: '',
      period: '',
      description: '',
      skills: '',
      display_order: 0
    });
  };

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
    const descriptionArray = formData.description.split('\n').map(d => d.trim()).filter(d => d);

    saveMutation.mutate({
      company: formData.company,
      role: formData.role,
      period: formData.period,
      description: descriptionArray,
      skills: skillsArray,
      display_order: parseInt(formData.display_order.toString()) || 0
    });
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      role: job.role,
      period: job.period,
      description: job.description ? job.description.join('\n') : '',
      skills: job.skills ? job.skills.join(', ') : '',
      display_order: job.display_order || 0
    });
    setIsSheetOpen(true);
  };

  const moveJob = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === jobs.length - 1) return;

    const currentJob = jobs[index];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const targetJob = jobs[targetIndex];

    // Swap display_order
    reorderMutation.mutate({ id: currentJob.id, newOrder: targetJob.display_order });
    reorderMutation.mutate({ id: targetJob.id, newOrder: currentJob.display_order });
  };

  const handleBulkParse = () => {
    setBulkError(null);
    setParsedJobs([]);

    try {
      // Clean input similar to Projects
      let cleanInput = bulkInput.trim();
      cleanInput = cleanInput.replace(/export\s+const\s+\w+(\s*:\s*\w+(\[\])?)?\s*=\s*/, '');
      cleanInput = cleanInput.replace(/;$/, '');

      const rawData = JSON5.parse(cleanInput);

      if (!Array.isArray(rawData)) {
        throw new Error('Input must be an array of objects.');
      }

      const mappedJobs: Omit<Job, 'id'>[] = rawData.map((item: RawJob, index) => {
        if (!item.company || !item.role) throw new Error(`Item at index ${index} is missing company or role.`);

        return {
          company: item.company,
          role: item.role,
          period: item.period || '',
          description: item.description || [],
          skills: item.skills || [],
          display_order: (jobs.length > 0 ? Math.max(...jobs.map(j => j.display_order)) : 0) + index + 1
        };
      });

      setParsedJobs(mappedJobs);

    } catch (err: any) {
      setBulkError(err.message || 'Failed to parse input. Please ensure it is a valid JavaScript array or JSON.');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Work Experience</h1>
          <p className="text-muted-foreground">Manage your professional experience.</p>
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
                <SheetTitle>Bulk Import Work Experience</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Paste Jobs Array (JSON or JS Object)</Label>
                  <p className="text-xs text-muted-foreground">
                    Paste the content of your jobs array.
                  </p>
                  <textarea
                    className="flex min-h-50 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="[{ company: 'Company', role: 'Role', ... }, ...]"
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

                {parsedJobs.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Preview ({parsedJobs.length} jobs)</h3>
                    </div>
                    <div className="max-h-75 overflow-y-auto space-y-2 border rounded-md p-2">
                      {parsedJobs.map((job, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 border rounded bg-card/50">
                          <div className="flex justify-between font-medium">
                            <span>{job.role}</span>
                            <span className="text-muted-foreground text-sm">{job.period}</span>
                          </div>
                          <div className="text-sm text-primary">{job.company}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {job.skills.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => bulkInsertMutation.mutate(parsedJobs)}
                      className="w-full"
                      disabled={bulkInsertMutation.isPending}
                    >
                      {bulkInsertMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Import {parsedJobs.length} Jobs
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
                <Plus className="mr-2 h-4 w-4" /> Add Job
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSave} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. Jan 2024 - Present"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (one bullet point per line)</Label>
                  <Textarea
                    id="description"
                    className="flex min-h-37.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="- Developed feature X..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
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
                  {editingJob ? 'Update Job' : 'Add Job'}
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
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <Card key={job.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.role}</CardTitle>
                    <div className="text-lg font-medium text-primary mt-1">{job.company}</div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {job.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground mb-4 text-sm">
                  {job.description?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveJob(index, 'up')}
                    disabled={index === 0 || reorderMutation.isPending}
                    title="Move Up"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveJob(index, 'down')}
                    disabled={index === jobs.length - 1 || reorderMutation.isPending}
                    title="Move Down"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(job)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Delete this work experience?')) {
                        deleteMutation.mutate(job.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          {jobs.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No work experience added</h3>
              <p className="text-muted-foreground mb-4">Add your first job manually or use bulk import.</p>
              <Button onClick={() => setIsSheetOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Job
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
