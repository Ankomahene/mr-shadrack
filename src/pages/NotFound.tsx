import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button.tsx';
import { useSeo } from '../lib/seo.ts';

export function NotFound() {
  useSeo({ title: 'Not found', noindex: true });
  return (
    <div className="container-page flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Nothing here.</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">The page moved, or never existed.</p>
      <Button asChild variant="outline" size="lg" className="mt-10">
        <Link to="/">
          <ArrowLeft /> Back home
        </Link>
      </Button>
    </div>
  );
}
