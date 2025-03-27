import { SocialHandles } from './SocialHandles';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 mt-12">
      <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/mr-shadrack-dark.png"
            alt="Logo"
            className="h-[70px] w-auto dark:invert"
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Shadrack Ankomahene. All rights
            reserved
          </p>
          <a
            href="mailto:ankomaheneshadrack@gmail.com"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            ankomaheneshadrack@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SocialHandles />
        </motion.div>
      </div>
    </footer>
  );
};
