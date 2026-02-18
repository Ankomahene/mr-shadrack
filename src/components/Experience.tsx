import { FaLaptopCode, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Experience = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);

  useEffect(() => {
    const startDate = new Date('2019-11-01');
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - startDate.getTime();
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    setYearsOfExperience(Math.floor(diffInYears));
  }, []);

  return (
    <div
      className="flex flex-col lg:flex-row my-24 bg-secondary dark:bg-secondary/50 rounded-lg overflow-hidden shadow-lg"
      id="experience"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-center bg-gradient-to-br from-primary-800 to-primary-600 
                   w-full lg:w-auto lg:min-w-[250px] py-12 lg:py-0 px-12 text-white"
      >
        <div className="text-center">
          <h2 className="text-6xl font-bold">
            {yearsOfExperience}<sup>+</sup>
          </h2>
          <p className="mt-2 text-xl">Years</p>
          <p className="text-xl">Working</p>
          <p className="text-xl">Experience</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 p-8 flex-1">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="px-4 text-emerald-600 dark:text-emerald-500">
            <FaLaptopCode size={40} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold my-2">Frontend Dev</h3>
          <p className="text-muted-foreground leading-relaxed">
            I create engaging and user-friendly interfaces using HTML, CSS,
            JavaScript, TypeScript and modern frameworks like React.js, Next.js,
            and Angular. My focus is on performance, accessibility, and responsive design.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="px-4 text-violet-600 dark:text-violet-500">
            <FaServer size={40} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold my-2">Fullstack Dev</h3>
          <p className="text-muted-foreground leading-relaxed">
            I build scalable backend systems and APIs using Node.js, Nest.js, and PostgreSQL.
            I integrate secure authentication, cloud services (Google/AWS/Azure), and database architectures
            to deliver complete, robust web solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
