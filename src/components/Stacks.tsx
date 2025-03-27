import { motion } from 'framer-motion';

export const Stacks = () => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className="border border-dotted border-primary/30 rounded-full absolute 
                 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] 
                 xl:w-[500px] xl:h-[500px] 2xl:w-[650px] 2xl:h-[650px]"
    >
      <motion.button
        className="btn btn1"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/react.svg" alt="React" className="w-full h-full" />
      </motion.button>

      <motion.button
        className="btn btn2"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/angular.svg" alt="Angular" className="w-full h-full" />
      </motion.button>

      <motion.button
        className="btn btn3"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/typescript.svg" alt="TypeScript" className="w-full h-full" />
      </motion.button>

      <motion.button
        className="btn btn4"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/html5.svg" alt="HTML5" className="w-full h-fullt" />
      </motion.button>

      <motion.button
        className="btn btn5"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/css3.svg" alt="CSS3" className="w-full h-full" />
      </motion.button>

      <motion.button
        className="btn btn6"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/javascript.svg" alt="JavaScript" className="w-full h-full" />
      </motion.button>

      <motion.button
        className="btn btn7"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src="/nextjs.svg"
          alt="Next.js"
          className="w-full h-full dark:invert"
        />
      </motion.button>

      <motion.button
        className="btn btn8"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/tailwind.svg" alt="Tailwind CSS" className="w-full h-full" />
      </motion.button>
    </motion.div>
  );
};
