import { projects } from '../consts';
import { ProjectCard } from './ProjectCard';
import { Card } from './ui/card';
import { motion } from 'framer-motion';

export const Projects = () => {
  return (
    <section id="projects">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-8 text-white text-center h-[250px] flex flex-col justify-center items-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="py-4 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Here are a few of some of the projects I have built in the past
        </motion.p>
      </div>

      <Card className="w-full lg:w-4/5 mx-auto p-8 -mt-[80px] shadow-lg">
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map(({ name, link, imageUrl, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                name={name}
                imageUrl={imageUrl}
                link={link}
                description={description}
              />
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
};
