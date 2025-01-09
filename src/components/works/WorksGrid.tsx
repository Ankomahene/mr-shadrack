import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Work } from '../../types/Work';
import WorkCard from './WorkCard';
import WorkDrawer from './WorkDrawer';
import { useState } from 'react';

interface WorksGridProps {
  works: Work[];
}

export const WorksGrid = ({ works }: WorksGridProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} py={8}>
        {works.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            onClick={() => handleWorkClick(work)}
          />
        ))}
      </SimpleGrid>
      <WorkDrawer isOpen={isOpen} onClose={onClose} work={selectedWork} />
    </>
  );
};
