import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: ReactNode;
  label: string;
  color: string;
}

export const SkillCard = ({ icon, label, color }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex items-center w-fit border bg-card shadow-sm overflow-hidden"
      style={{ borderTopColor: color, borderTopWidth: '2px' }}
    >
      <div className="p-3 text-xl" style={{ color }}>
        {icon}
      </div>
      <div className="p-3 font-medium" style={{ color }}>
        {label}
      </div>
    </motion.div>
  );
};
