import { useState, useEffect } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Card } from './ui/card';

type GitHubContributionProps = {
  username: string;
};

export const GitHubContribution = ({ username }: GitHubContributionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Set up loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Force re-render when theme changes
  useEffect(() => {
    // Function to determine and set theme
    const updateTheme = () => {
      const isDarkTheme =
        resolvedTheme === 'dark' ||
        document.documentElement.classList.contains('dark');

      setCurrentTheme(isDarkTheme ? 'dark' : 'light');
    };

    // Initial update
    updateTheme();

    // Create a MutationObserver to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          updateTheme();
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [resolvedTheme]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="py-6">
        <h3 className="text-xl font-semibold mb-6">GitHub Contributions</h3>
        <div className="p-4 bg-card rounded-lg shadow-sm h-32 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="py-6">
      <h3 className="text-xl font-semibold mb-6 text-center px-4">
        GitHub Contributions Graph
      </h3>
      <div className="p-4 bg-card rounded-lg shadow-sm overflow-x-auto">
        {hasError ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Unable to load GitHub contributions</p>
            <p className="text-sm mt-2">
              Please check your connection or the GitHub username.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="min-w-[750px] md:min-w-0 w-full"
          >
            <GitHubCalendar
              key={`github-calendar-${currentTheme}`}
              username={username}
              colorScheme={currentTheme}
              labels={{
                totalCount: '{{count}} contributions in the last 2 years',
              }}
              style={{
                maxWidth: '100%',
                margin: '0 auto',
              }}
            />
          </motion.div>
        )}
        <div className="mt-4 text-xs text-muted-foreground text-right">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            View full profile on GitHub &rarr;
          </a>
        </div>
      </div>
    </Card>
  );
};
