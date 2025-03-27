import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const SentAlertMain = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="w-full lg:w-4/5 mx-auto p-6 bg-green-50 dark:bg-green-900/20 
                 flex flex-col items-center justify-center text-center h-[250px] rounded-md"
    >
      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
        Message submitted to Mr. Shadrack!
      </h3>
      <p className="max-w-md text-green-600 dark:text-green-400">
        Thank you for your message. Will get back to you as soon as possible
      </p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <img src="/thankyou.gif" alt="Thank you" className="h-16 w-auto" />
      </motion.div>
    </motion.div>
  );
};
