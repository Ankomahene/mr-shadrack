import { mainSkills, otherSkills } from '../consts';
import { SkillCard } from './SkillCard';
import { motion } from 'framer-motion';

export const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-12 border-t border-border/40">
      <h2
        id="about"
        className="text-3xl md:text-4xl font-bold my-12 text-center"
      >
        About Me
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 my-8" id="summary">
        <div className="w-full lg:w-1/4">
          <h3 className="text-xl font-semibold text-primary mb-4">Summary</h3>
          <div className="h-1 w-12 bg-primary rounded-full"></div>
        </div>
        <div className="w-full lg:w-3/4 text-lg leading-relaxed text-muted-foreground">
          <p className="mb-6">
            Experienced Software Engineer with over six years of professional experience.
            I hold a bachelor's degree in Computer Science Education from the University of Cape Coast, Ghana.
          </p>
          <p className="mb-6">
            I have a strong foundation in JavaScript and TypeScript, building scalable, production-ready applications across web platforms.
            My expertise combines clean architecture with modern best practices.
          </p>
          <p>
            Beyond employment, I am an entrepreneur building SaaS products and AI-powered applications.
            I am passionate about problem-solving, performance optimization, and delivering user-focused solutions.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 my-12" id="skills">
        <div className="w-full lg:w-1/4">
          <h3 className="text-xl font-semibold text-primary mb-4">Core Stack</h3>
          <div className="h-1 w-12 bg-primary rounded-full"></div>
        </div>
        <div className="w-full lg:w-3/4">
          <motion.div
            className="flex flex-wrap gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {mainSkills.map(({ icon, label, color }, i) => (
              <SkillCard
                key={label + i}
                icon={icon}
                label={label}
                color={color}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 my-12">
        <div className="w-full lg:w-1/4">
          <h3 className="text-xl font-semibold text-primary mb-4">Tools & Ecosystem</h3>
          <div className="h-1 w-12 bg-primary rounded-full"></div>
        </div>
        <div className="w-full lg:w-3/4">
          <motion.div
            className="flex flex-wrap gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {otherSkills.map(({ icon, label, color }, i) => (
              <SkillCard
                key={label + i}
                icon={icon}
                label={label}
                color={color}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
