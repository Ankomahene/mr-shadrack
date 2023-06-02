import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';

interface ProjectCardProps {
  imageUrl: string;
  name: string;
  description: string;
  link: string;
}

export const ProjectCard = ({
  imageUrl,
  name,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <Card
      maxW="xs"
      rounded="none"
      _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }}
      transition="transform .3s"
      overflow="hidden"
    >
      <CardBody p={0}>
        <Box
          h="200px"
          w="320px"
          bg={`center / cover no-repeat url(${imageUrl} )`}
        />
        <Stack mt="6" spacing="3" p="1rem">
          <Heading size="sm">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        </Stack>

        <Flex justify="start" p="1rem">
          <Link href={link} isExternal={true}>
            <Button
              size="sm"
              color="brand.500"
              bgColor="blue.100"
              display="flex"
              alignItems="center"
              px="1rem"
              rounded="sm"
              _hover={{ ccolor: 'brand.500', bgColor: 'blue.100' }}
            >
              <Text mx="5px">View</Text>
              <BiLinkExternal />
            </Button>
          </Link>
        </Flex>
      </CardBody>
      <Divider />
    </Card>
  );
};
