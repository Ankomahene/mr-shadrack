import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    reviews: 0,
    projects: 0,
    messages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: reviews } = await supabase.from('year_in_review').select('*', { count: 'exact', head: true });
      const { count: projects } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: messages } = await supabase.from('messages').select('*', { count: 'exact', head: true });
      const { count: unread } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);

      setStats({
        reviews: reviews || 0,
        projects: projects || 0,
        messages: messages || 0,
        unreadMessages: unread || 0
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/admin/year-in-review">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Log Entry
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Year in Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviews}</div>
            <p className="text-xs text-muted-foreground">Total logged memories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">{stats.unreadMessages} unread</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
