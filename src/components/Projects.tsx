import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  image_url: string;
  tags: string[];
  display_order: number;
}

export const Projects = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['public-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Project[];
    }
  });

  return (
    <section id="projects" className="w-full lg:w-4/5 mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A selection of some of the projects I have worked on.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ name, link, image_url, description, tags }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProjectCard
                name={name}
                imageUrl={image_url}
                link={link}
                description={description}
                stacks={tags}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
