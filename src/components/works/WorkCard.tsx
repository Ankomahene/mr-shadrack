import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { Work } from '../../types/Work';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <Image
        src={work.thumbnail}
        alt={work.title}
        borderRadius="lg"
        objectFit="cover"
        w="100%"
        h="240px"
      />
      <VStack align="start" mt={3} spacing={1}>
        <Text fontWeight="bold" fontSize="lg">
          {work.title}
        </Text>
        <Text color="gray.600" noOfLines={2}>
          {work.description}
        </Text>
      </VStack>
    </Box>
  );
};

export default WorkCard;
