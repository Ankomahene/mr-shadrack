import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row my-16 lg:my-32 gap-12 items-center" id="hero">
      <motion.div
        className="w-full lg:w-2/3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          Available for new opportunities
        </div>
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
          Shadrack Ankomahene
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary font-medium mb-6">
          Senior Frontend Engineer
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          I am a software engineer with specialty in Frontend, focused on building scalable, high-performance web applications with modern technologies like
          React, Angular, Next.js, TypeScript and Node.js that deliver exceptional user experiences.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to="projects" smooth={true} duration={1000}>
            <Button size="lg" className="h-12 px-8 text-lg">
              View Work
            </Button>
          </Link>

          <Link to="contact" smooth={true} duration={1000}>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg"
            >
              Contact Me
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/3 flex justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-primary/10 bg-card shadow-2xl">
            <img
              src="/shad-portrait.jpg"
              alt="Shadrack Ankomahene"
              className="w-full h-full object-cover object-top scale-95 rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
