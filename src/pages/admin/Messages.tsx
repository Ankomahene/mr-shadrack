import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Mail, CheckCircle, Trash2, Clock, Loader2 } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const AdminMessages = () => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Message[];
    }
  });

  const toggleReadMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: string, isRead: boolean }) => {
      const { error } = await supabase.from('messages').update({ is_read: !isRead }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Inbox from your contact form.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {messages.length === 0 && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            No messages yet.
          </div>
        )}

        {messages.map((msg) => (
          <Card key={msg.id} className={`${!msg.is_read ? 'border-primary/50 bg-primary/5' : ''}`}>
            <CardHeader className="flex flex-col md:flex-row items-start justify-between pb-2 gap-4">
              <div className="space-y-1 w-full">
                <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
                  {msg.name}
                  {!msg.is_read && <Badge variant="default" className="text-xs">New</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center md:ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </CardDescription>
                <div className="pt-2 text-sm whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
              <div className="flex gap-2 self-end md:self-start">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReadMutation.mutate({ id: msg.id, isRead: msg.is_read })}
                  title={msg.is_read ? "Mark as unread" : "Mark as read"}
                  disabled={toggleReadMutation.isPending}
                >
                  {toggleReadMutation.isPending && msg.id === toggleReadMutation.variables?.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className={`h-4 w-4 ${msg.is_read ? 'text-green-500' : 'text-muted-foreground'}`} />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    if (confirm('Delete this message?')) {
                      deleteMutation.mutate(msg.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending && msg.id === deleteMutation.variables ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
