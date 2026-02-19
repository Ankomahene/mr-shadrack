import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export const WorkExperience = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['public-work-experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Job[];
    }
  });

  return (
    <section id="work-experience" className="w-full lg:w-4/5 mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Work Experience
        </h2>
        <p className="text-muted-foreground text-lg">
          My professional journey and career milestones.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="relative border-l border-primary/20 ml-3 md:ml-6 space-y-12">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-2.25 top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />

              <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-none bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                    <h4 className="text-lg font-semibold text-primary">{job.company}</h4>
                  </div>
                  <div className="flex items-center text-sm font-medium bg-gray-200 dark:bg-gray-900 text-foreground px-3 py-1 rounded-full w-fit">
                    <FaCalendarAlt className="mr-2" />
                    {job.period}
                  </div>
                </div>

                <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground mb-6">
                  {job.description?.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-900 text-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <a href="https://github.com/Ankomahene/ankomahene/blob/main/Shadrack%20Ankomahene_CV.pdf?raw=true" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
          <FaBriefcase className="mr-2" /> Download Full Resume
        </a>
      </div>
    </section>
  );
};
