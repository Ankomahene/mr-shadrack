import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Job {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

const jobs: Job[] = [
  {
    company: 'Indel Technologies',
    role: 'Frontend Engineer (Contract)',
    period: 'Jan 2026 – Feb 2026',
    description: [
      'Developed the complete Patient Dashboard for Bawa Health, an AI-Powered Health Management System.',
      'Built appointment booking system with integrated online payment and AI-based doctor recommendations.',
      'Contributed to a custom in-app video consultation system using Daily.co with live transcription and screen sharing.',
    ],
    skills: ['React', 'Next.js', 'Daily.co', 'TypeScript', 'Shadcn/Tailwind CSS', 'React Query', 'Zustand'],
  },
  {
    company: 'Kreeo AI',
    role: 'Full-Stack Engineer',
    period: 'Nov 2025 – Present',
    description: [
      'Lead development of Kreeo Sync, a Figma plugin built with React for documenting and generating AI-powered designer portfolios.',
      'Manage full system architecture including Figma Plugin (React + TypeScript), Web Dashboard (React), and Backend (Nest.js + PostgreSQL via Supabase).',
      'Implemented secure authentication using Figma OAuth and project syncing systems.',
      'Developed AI-powered case study generation and integrated speech-to-text functionality using OpenAI APIs.',
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Nest.js', 'PostgreSQL', 'Supabase', 'OpenAI', 'Figma'],
  },
  {
    company: 'Faithtower Media Technologies',
    role: 'Founder & Software Engineer',
    period: 'Jan 2025 – Present',
    description: [
      'Designed and launched multiple SaaS products, including Sales Management, Smart Church Management, and Inventory Management systems, currently used by businesses and organizations.',
      'Built scalable multi-tenant web applications using React, Next.js, TypeScript, and modern frontend architecture, handling authentication, subscriptions, and role-based access.',
      'Led full product lifecycle: product strategy, system design, development, deployment, client onboarding, and ongoing support.',
      'Delivered custom web platforms for NGOs, hotels, and companies, helping organizations digitize operations and improve workflow efficiency.',
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Nest.js', 'PostgreSQL', 'Supabase', 'OpenAI', 'Figma'],
  },
  {
    company: 'Morgan Stanley',
    role: 'Software Engineer',
    period: 'Mar 2020 – Dec 2024',
    description: [
      'Built and maintained internal API platforms and developer tools using React, Angular, TypeScript, and Microsoft Azure, supporting enterprise-level developer systems.',
      'Developed a self-service API deployment tool with OpenAPI validation, semantic versioning, and policy management, reducing API deployment time by 40% and improving developer efficiency.',
      'Improved frontend performance by reducing unnecessary HTTP requests and implementing caching strategies, leading to faster load times and better user experience.',
      'Optimized CI/CD pipelines by introducing parallel builds and workflow improvements, reducing build time by 60% while maintaining 95%+ automated test coverage.',
      'Contributed to shared Angular and TypeScript inner-source libraries, improving code quality, maintainability, and reuse across multiple teams',
      'Designed and implemented an internal API marketplace using React and TypeScript, improving developer discovery and increasing platform engagement by 25%'
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js', 'AWS', 'Azure'],
  },
  {
    company: 'Turntabl Ghana Limited',
    role: 'Software Engineer',
    period: 'Oct 2019 – Dec 2024',
    description: [
      'Built a large-scale ETL pipeline using Python and AWS, processing over 7GB of JSON data from the AWS data lake, converting to ORC format, and deploying via AWS Batch and EC2 to support personalized user recommendations.',
      'Led a team of 3 developers across multiple projects, assigned tasks, conducted code reviews, and ensured high engineering standards.',
      'Trained 50+ engineers annually in JavaScript, React, Angular, and TypeScript, during company training programs improving frontend proficiency by 40% based on internal assessments.',
      'Organized and facilitated React.js masterclasses for frontend engineers within the firm',
      'Mentored junior engineers, providing guidance on technical challenges and best practices',
    ],
    skills: ['JavaScript', 'Java', 'Spring Boot', 'React', 'Agile'],
  },
];

export const WorkExperience = () => {
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

      <div className="relative border-l border-primary/20 ml-3 md:ml-6 space-y-12">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
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
                {job.description.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-900 text-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="https://github.com/Ankomahene/ankomahene/blob/main/Shadrack%20Ankomahene_CV.pdf?raw=true" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
          <FaBriefcase className="mr-2" /> Download Full Resume
        </a>
      </div>
    </section>
  );
};
