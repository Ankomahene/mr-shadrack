import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Works } from './pages/Works';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/layouts/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { YearInReview } from './pages/admin/YearInReview';
import { AdminProjects } from './pages/admin/Projects';
import { AdminMessages } from './pages/admin/Messages';
import { AdminStatus } from './pages/admin/Status';
import { PublicYearInReview } from './pages/PublicYearInReview';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui-designs" element={<Works />} />
        <Route path="/year-in-review" element={<PublicYearInReview />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="year-in-review" element={<YearInReview />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="status" element={<AdminStatus />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
