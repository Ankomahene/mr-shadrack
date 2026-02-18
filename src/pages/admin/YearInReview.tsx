import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import { Plus, Trash2, Edit, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface LogEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  media_url: string;
  tags: string[];
}

export const YearInReview = () => {
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Work',
    media_url: '',
    tags: ''
  });

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['year-in-review-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('year_in_review')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data as LogEntry[];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingLog) {
        const { error } = await supabase.from('year_in_review').update(data).eq('id', editingLog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('year_in_review').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['year-in-review-admin'] });
      setIsSheetOpen(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('year_in_review').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['year-in-review-admin'] });
    }
  });

  const resetForm = () => {
    setEditingLog(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Work',
      media_url: '',
      tags: ''
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(t => t);

    saveMutation.mutate({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      category: formData.category,
      media_url: formData.media_url,
      tags: tagsArray
    });
  };

  const openEdit = (log: LogEntry) => {
    setEditingLog(log);
    setFormData({
      title: log.title,
      description: log.description || '',
      date: log.date,
      category: log.category || 'Work',
      media_url: log.media_url || '',
      tags: log.tags ? log.tags.join(', ') : ''
    });
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Year in Review</h1>
          <p className="text-muted-foreground">Manage your timeline entries.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) resetForm();
        }}>
          <SheetTrigger asChild>
            <Button onClick={() => resetForm()} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Memory
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{editingLog ? 'Edit Memory' : 'Add New Memory'}</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Work">Work</option>
                  <option value="Life">Life</option>
                  <option value="Learning">Learning</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Other">Other</option>
                </select>
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
                <Label htmlFor="media_url">Media URL (Image/Link)</Label>
                <Input
                  id="media_url"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Promotion, Travel, Certificate"
                />
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingLog ? 'Update Memory' : 'Add Memory'}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {log.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(log)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Delete this memory?')) {
                        deleteMutation.mutate(log.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-3 w-3" />
                  {log.date}
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {log.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {log.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
