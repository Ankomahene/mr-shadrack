import { Work } from '../../types/Work';
import { motion } from 'framer-motion';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <motion.div
      className="cursor-pointer overflow-hidden group"
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="overflow-hidden rounded-lg">
        <motion.img
          src={work.thumbnail}
          alt={work.title}
          className="w-full h-[240px] object-cover transition-transform duration-500 ease-in-out"
          whileHover={{ scale: 1.1 }}
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
          {work.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">{work.description}</p>
      </div>
    </motion.div>
  );
};

export default WorkCard;
