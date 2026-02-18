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
    <Card className="py-6 border shadow-none">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://awesome-github-stats.azurewebsites.net/index.html??cardType=github&theme=dark&fontFamily=Inter&preferLogin=false">
            <img alt="ankomahene's GitHub Stats" src={`https://awesome-github-stats.azurewebsites.net/user-stats/${username}?cardType=github&theme=${currentTheme === 'dark' ? 'dark' : 'default'}&fontFamily=Inter&preferLogin=false`} />
          </a>
          <img src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=${currentTheme === 'dark' ? '2077' : 'default'}`} alt="Repos per language" />
          <img src={`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=${currentTheme === 'dark' ? '2077' : 'default'}&utcOffset=8`} alt="Productive time" />
        </div>

        <div className="p-4 bg-card  overflow-x-auto">
          <h3 className="text-xl font-semibold mb-6 text-center px-4">
            Contribution Calendar
          </h3>
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
              className="flex justify-center min-w-[800px] md:min-w-full"
            >
              <GitHubCalendar
                username={username}
                colorScheme={currentTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
};
