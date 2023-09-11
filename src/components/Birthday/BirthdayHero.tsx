import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Frame } from '../Frame';

export const BirthdayHero = () => {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }} my="2rem" id="hero">
      <Box w={{ base: '100%', lg: '50%' }}>
        <Frame />
        <Heading size={{ base: '2xl', md: '3xl', xl: '4xl' }} lineHeight="6rem">
          Hi! I Am Mr. Shadrack
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'xl' }} my="2rem">
          And today is my{' '}
          <Text as={'span'} fontWeight="bold" color="blue.500">
            Birthday.
          </Text>{' '}
          Write me a Secrete Birthday Message. I won't Know who wrote it.
        </Text>
      </Box>
      <Flex
        gap={6}
        justify="center"
        align="center"
        placeContent="center"
        w={{ base: '100%', lg: '50%' }}
        pos="relative"
        my={{ base: '4rem', lg: 'none' }}
      >
        <Image
          src="birthday.gif"
          alt=""
          boxSize={{
            base: '200px',
            lg: '350px',
            xl: '450px',
            '2xl': '550px',
          }}
        />
      </Flex>
    </Flex>
  );
};
