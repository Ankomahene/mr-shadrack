import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Calendar, FolderGit2, MessageSquare, LogOut, Briefcase, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ThemeToggle } from '../theme-toggle';

export const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Year in Review', path: '/admin/year-in-review', icon: <Calendar size={20} /> },
    { label: 'Projects', path: '/admin/projects', icon: <FolderGit2 size={20} /> },
    { label: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { label: 'Status', path: '/admin/status', icon: <Briefcase size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Admin
        </h2>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={handleSignOut}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card p-6 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Admin
          </h2>
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="justify-end mb-4 hidden md:flex">
              <ThemeToggle />
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
