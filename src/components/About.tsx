import { mainSkills, otherSkills } from '../consts';
import { SkillCard } from './SkillCard';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

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
    <section className="py-12">
      <h2
        id="about"
        className="text-2xl md:text-3xl font-bold my-8 text-primary"
      >
        More About me
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 my-8" id="summary">
        <div className="w-full lg:w-1/5 text-xl font-semibold text-primary/80">
          Summary
        </div>
        <div className="w-full lg:w-4/5 p-4 md:p-8 border-l border-primary/20 text-lg">
          <p className="text-muted-foreground">
            Experienced and dedicated software engineer specializing in frontend
            development, with five years of professional experience. Proficient
            in HTML, CSS, JavaScript, React.js, Next.js, Angular, and
            TypeScript.
          </p>
          <p className="text-muted-foreground mt-4">
            Passionate about problem-solving and driven by excellence, I bring a
            wealth of expertise and a strong focus on UI/UX to any software
            development team.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 my-8" id="skills">
        <div className="w-full lg:w-1/5 text-xl font-semibold pt-8 text-primary/80">
          Skills
        </div>
        <div className="w-full lg:w-4/5 p-4 md:p-8 border-l border-primary/20">
          <h3 className="text-xl font-semibold my-4 pb-4 border-b">
            Super Powers
          </h3>
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

          <h3 className="text-xl font-semibold my-4 pb-4 border-b mt-8">
            Other Powers
          </h3>
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

          <p className="my-8 text-lg">
            These are not the only powers I have. Check out{' '}
            <a href="/resume-02-25.pdf" download="shadrack-resume.pdf">
              <Button variant="link" className="text-primary mx-1 px-1">
                my resume
              </Button>
            </a>
            to see more
          </p>
        </div>
      </div>
    </section>
  );
};
