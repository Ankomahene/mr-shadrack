import { TbArrowBigDownLineFilled } from 'react-icons/tb';
import { Link } from 'react-scroll';
import { Frame } from './Frame';
import { Stacks } from './Stacks';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row my-8 gap-8" id="hero">
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Frame />
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
          Hi! I Am <span className="text-primary">Shadrack Ankomahene</span>
        </h1>

        <p className="text-md md:text-lg lg:text-xl my-8 text-muted-foreground">
          I enjoy creating robust and scalable frontend solutions that provide
          excellent user experiences.
        </p>
        <div className="flex flex-col lg:flex-row gap-4">
          <Link to="resume" smooth={true} duration={1000}>
            <Button variant="gradient" className="min-w-[200px] h-[50px]">
              <span className="mx-2">Resume</span>
              <TbArrowBigDownLineFilled className="ml-2" />
            </Button>
          </Link>

          <Link to="about" smooth={true} duration={1000}>
            <Button
              variant="outline"
              className="min-w-[200px] h-[50px] border-primary"
            >
              More About me
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-6 justify-center items-center w-full lg:w-1/2 relative my-16 lg:my-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img
          className="transform scale-x-[-1] w-[200px] lg:w-[350px] xl:w-[450px] 2xl:w-[550px]"
          src="/illustration1.svg"
          alt="Developer illustration"
        />

        <Stacks />
      </motion.div>
    </div>
  );
};
