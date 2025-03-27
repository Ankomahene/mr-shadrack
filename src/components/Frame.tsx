import { motion } from 'framer-motion';

export const Frame = () => {
  return (
    <motion.div
      className="frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="photo"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <img
          src="/photo.png"
          alt="Profile Photo"
          className="dark:brightness-90"
        />
      </motion.div>
    </motion.div>
  );
};
