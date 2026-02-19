import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { SocialHandles } from './SocialHandles';

export const Navigation = () => {
  return (
    <div className="w-full lg:w-4/5 mx-auto p-8 mb-8">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center"
        >
          <RouterLink to="/" className="font-bold text-lg">
            <img
              src="/mr-shadrack-dark.png"
              alt="Logo"
              className="h-10 md:h-17.5 w-auto hidden md:block"
            />
          </RouterLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 w-full md:w-fit justify-between"
        >
          {/* <RouterLink
            to="/ui-designs"
            className="text-lg font-bold hover:text-primary transition-colors"
          >
            UI/UX Designs
          </RouterLink> */}
          <RouterLink
            to="/year-in-review"
            className="md:text-lg font-bold hover:text-primary transition-colors mx-2"
          >
            My Year in Review
          </RouterLink>
          <SocialHandles />
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
};
