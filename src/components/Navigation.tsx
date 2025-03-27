import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';

export const Navigation = () => {
  return (
    <div className="w-full lg:w-4/5 mx-auto p-8 mb-8">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <RouterLink to="/" className="font-bold text-lg">
            <img
              src="/mr-shadrack-dark.png"
              alt="Logo"
              className="h-[70px] w-auto"
            />
          </RouterLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <RouterLink
            to="/ui-designs"
            className="text-lg font-bold hover:text-primary transition-colors"
          >
            UI/UX Designs
          </RouterLink>
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
};
