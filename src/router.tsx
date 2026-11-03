import { useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router';
import { CommandMenu } from './components/site/CommandMenu.tsx';
import { Footer } from './components/site/Footer.tsx';
import { Nav } from './components/site/Nav.tsx';
import { useAuth } from './context/AuthContext.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';

/** Scrolls to "/#section" links, including after arriving from another page. */
function HashScroll() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // Wait a frame so the target section has rendered.
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);
  return null;
}

function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CommandMenu />
      <ScrollRestoration getKey={(location) => (location.hash ? location.key : location.pathname)} />
      <HashScroll />
    </div>
  );
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

const lazyPage = <T,>(load: () => Promise<T>, pick: (m: T) => React.ComponentType) => async () => ({
  Component: pick(await load()),
});

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work/:slug', lazy: lazyPage(() => import('./pages/Project.tsx'), (m) => m.Project) },
      { path: 'journal', lazy: lazyPage(() => import('./pages/Journal.tsx'), (m) => m.Journal) },
      { path: 'year-in-review', element: <Navigate to="/journal" replace /> },
      { path: 'ui-designs', element: <Navigate to="/#work" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'admin/login', lazy: lazyPage(() => import('./pages/admin/Login.tsx'), (m) => m.Login) },
  {
    path: 'admin',
    lazy: async () => {
      const { AdminLayout } = await import('./components/layouts/AdminLayout.tsx');
      return {
        Component: () => (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
      };
    },
    children: [
      { index: true, lazy: lazyPage(() => import('./pages/admin/Dashboard.tsx'), (m) => m.Dashboard) },
      { path: 'projects', lazy: lazyPage(() => import('./pages/admin/Projects.tsx'), (m) => m.AdminProjects) },
      { path: 'work-experience', lazy: lazyPage(() => import('./pages/admin/WorkExperience.tsx'), (m) => m.AdminWorkExperience) },
      { path: 'journal', lazy: lazyPage(() => import('./pages/admin/YearInReview.tsx'), (m) => m.YearInReview) },
      { path: 'year-in-review', element: <Navigate to="/admin/journal" replace /> },
      { path: 'messages', lazy: lazyPage(() => import('./pages/admin/Messages.tsx'), (m) => m.AdminMessages) },
      { path: 'status', lazy: lazyPage(() => import('./pages/admin/Status.tsx'), (m) => m.AdminStatus) },
    ],
  },
]);
