import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FaCode } from 'react-icons/fa';

export const Experience = () => {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }} bgColor="gray.200" my="6rem">
      <Flex
        flexDir="column"
        justify="center"
        align="center"
        bgColor="brand.700"
        boxSize={{ base: '250px' }}
        py={{ base: '2rem', lg: '0' }}
        px="4rem"
      >
        <Box color="white">
          <Heading size="4xl">4+</Heading>
          <Text mt="0.5rem">Years</Text>
          <Text>Working</Text>
          <Text>Experience</Text>
        </Box>
      </Flex>

      <Flex p="2rem" gap="6" flexDir={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '50%' }}>
          <Box px="1rem">
            <FaCode size="3rem" color="#2563eb" />
          </Box>
          <Heading my="0.5rem" size={{ base: 'md', lg: 'lg' }}>
            Frontend Developer
          </Heading>
          <Text>
            I create engaging and user-friendly interfaces using HTML, CSS, and
            JavaScript and all Javascript Frameworks.
          </Text>
        </Box>

        <Box w={{ base: '100%', lg: '50%' }}>
          <Box px="1rem">
            <FaCode size="3rem" color="#2563eb" />
          </Box>
          <Heading my="0.5rem" size={{ base: 'md', lg: 'lg' }}>
            Graphic Design
          </Heading>
          <Text>
            I utilizes visual elements to create visually appealing and
            communicative designs for various mediums such as print, digital,
            and branding.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
