import { Box, Card, Heading, Text } from '@chakra-ui/react';
import { projects } from '../consts';
import { ProjectCard } from './ProjectCard';

export const Projects = () => {
  return (
    <>
      <Box
        bgColor="brand.500"
        p="2rem"
        color="white"
        textAlign="center"
        h="250px"
      >
        <Heading>My Projects</Heading>
        <Text py="1rem">
          Here are a few of some of the projects I have built in the past
        </Text>
      </Box>
      <Card
        w={{ base: '100%', lg: '80%' }}
        mx="auto"
        p="2rem"
        my="-80px"
        rounded="sm"
        direction="row"
        gap={4}
        flexWrap="wrap"
      >
        {projects.map(({ name, link, imageUrl, description }, i) => (
          <ProjectCard
            key={i}
            name={name}
            imageUrl={imageUrl}
            link={link}
            description={description}
          />
        ))}
      </Card>
    </>
  );
};
