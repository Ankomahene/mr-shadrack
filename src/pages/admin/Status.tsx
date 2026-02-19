import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ProfileStatus {
    id: string;
    status_text: string;
    project_link: string;
    is_available: boolean;
    is_visible?: boolean;
}

export const AdminStatus = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        status_text: '',
        project_link: '',
        is_available: true,
        is_visible: true
    });

    const { data: status, isLoading } = useQuery({
        queryKey: ['status'],
        queryFn: async () => {
            const { data } = await supabase
                .from('profile_status')
                .select('*')
                .limit(1)
                .single();

            if (data) return data as ProfileStatus;

            // Initialize if empty
            const initial = {
                status_text: 'Available for new opportunities',
                project_link: '',
                is_available: true,
                is_visible: true
            };
            const { data: newData } = await supabase.from('profile_status').insert([initial]).select().single();
            return newData as ProfileStatus;
        }
    });

    // Sync form data when status is loaded
    useEffect(() => {
        if (status) {
            setFormData({
                status_text: status.status_text,
                project_link: status.project_link || '',
                is_available: status.is_available,
                is_visible: status.is_visible ?? true
            });
        }
    }, [status]);

    const saveMutation = useMutation({
        mutationFn: async (data: any) => {
            if (status) {
                const { error } = await supabase.from('profile_status').update({
                    ...data,
                    updated_at: new Date().toISOString()
                }).eq('id', status.id);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['status'] });
            alert('Status updated successfully');
        },
        onError: (error: any) => {
            console.error('Error updating status:', error);
            alert(`Failed to update status: ${error.message || error}`);
        }
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate({
            status_text: formData.status_text,
            project_link: formData.project_link,
            is_available: formData.is_available,
            is_visible: formData.is_visible
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-0">
            <div>
                <h1 className="text-3xl font-bold">Work Status</h1>
                <p className="text-muted-foreground">Update what you are currently working on.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                    <CardDescription>
                        This information will be displayed on your portfolio hero section.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Status</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show the status section on your profile hero.
                                </p>
                            </div>
                            <Switch
                                checked={formData.is_visible}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Available for Work</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show the green "Available" badge on your profile.
                                </p>
                            </div>
                            <Switch
                                checked={formData.is_available}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status_text">Status Text</Label>
                            <Input
                                id="status_text"
                                value={formData.status_text}
                                onChange={(e) => setFormData({ ...formData, status_text: e.target.value })}
                                placeholder="e.g. Building a SaaS product"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project_link">Project Link (Optional)</Label>
                            <Input
                                id="project_link"
                                value={formData.project_link}
                                onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <Button type="submit" disabled={saveMutation.isPending}>
                            {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
