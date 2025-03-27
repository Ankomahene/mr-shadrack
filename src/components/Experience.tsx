import { FaFigma, FaLaptopCode, FaPenNib } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Experience = () => {
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
            5<sup>+</sup>
          </h2>
          <p className="mt-2 text-xl">Years</p>
          <p className="text-xl">Working</p>
          <p className="text-xl">Experience</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="px-4 text-emerald-600 dark:text-emerald-500">
            <FaLaptopCode size={40} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold my-2">Frontend Dev</h3>
          <p className="text-muted-foreground">
            I create engaging and user-friendly interfaces using HTML, CSS,
            JavaScript, TypeScript and frameworks like React.js, Next.js,
            Angular, etc.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="px-4 text-violet-600 dark:text-violet-500">
            <FaFigma size={40} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold my-2">UI/UX Design</h3>
          <p className="text-muted-foreground">
            I create intuitive and visually appealing user experiences through
            careful research, wireframing, prototyping and user testing to
            ensure optimal usability.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="px-4 text-primary">
            <FaPenNib size={40} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold my-2">Graphic Design</h3>
          <p className="text-muted-foreground">
            I utilize visual elements to create visually appealing and
            communicative designs for various mediums such as print, digital,
            and branding.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
