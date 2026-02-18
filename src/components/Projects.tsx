import { projects } from '../consts';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';

export const Projects = () => {
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
          A selection of projects demonstrating my expertise in frontend development and UI/UX design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ name, link, imageUrl, description, stacks }, i) => (
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
              imageUrl={imageUrl}
              link={link}
              description={description}
              stacks={stacks}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
