import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Text,
  VStack,
  Grid,
  GridItem,
  Tag,
  Box,
} from '@chakra-ui/react';
import { Work } from '../../types/Work';

interface WorkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  work: Work | null;
}

const WorkDrawer = ({ isOpen, onClose, work }: WorkDrawerProps) => {
  if (!work) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg" placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{work.title}</DrawerHeader>
        <DrawerBody>
          <Grid templateColumns={{ md: '1fr', lg: '3fr 1fr' }} gap={8}>
            <GridItem>
              <VStack spacing={8} align="start">
                {work.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${work.title} - ${index + 1}`}
                    borderRadius="lg"
                    w={{ base: '90%', lg: '80%' }}
                    mx="auto"
                  />
                ))}
              </VStack>
            </GridItem>
            <GridItem>
              <VStack
                spacing={6}
                position="sticky"
                top={4}
                w={{ base: '90%', lg: '80%' }}
                mx="auto"
              >
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>
                    About
                  </Text>
                  <Text>{work.details.description}</Text>
                </Box>
                {work.details.client && (
                  <Box w="100%">
                    <Text fontWeight="bold" mb={2}>
                      Client
                    </Text>
                    <Text>{work.details.client}</Text>
                  </Box>
                )}
                {work.details.role && (
                  <Box w="100%">
                    <Text fontWeight="bold" mb={2}>
                      Role
                    </Text>
                    <Text>{work.details.role}</Text>
                  </Box>
                )}
                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>
                    Tags
                  </Text>
                  <Box>
                    {work.tags.map((tag) => (
                      <Tag key={tag} mr={2} mb={2}>
                        {tag}
                      </Tag>
                    ))}
                  </Box>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkDrawer;
