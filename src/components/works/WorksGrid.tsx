import { useState } from 'react';
import { Work } from '../../types/Work';
import WorkCard from './WorkCard';
import WorkDrawer from './WorkDrawer';
import { motion } from 'framer-motion';

interface WorksGridProps {
  works: Work[];
}

export const WorksGrid = ({ works }: WorksGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {works.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            onClick={() => handleWorkClick(work)}
          />
        ))}
      </motion.div>
      <WorkDrawer isOpen={isOpen} onClose={onClose} work={selectedWork} />
    </>
  );
};
