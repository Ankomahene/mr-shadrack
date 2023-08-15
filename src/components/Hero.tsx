import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { TbArrowBigDownLineFilled } from 'react-icons/tb';
import { Link } from 'react-scroll';
import { Frame } from './Frame';
import { Stacks } from './Stacks';

export const Hero = () => {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }} my="2rem" id="hero">
      <Box w={{ base: '100%', lg: '50%' }}>
        <Frame />
        <Heading size={{ base: '2xl', md: '3xl', xl: '4xl' }} lineHeight="6rem">
          Hi! I Am Shadrack Ankomahene
        </Heading>

        <Text fontSize={{ base: 'md', lg: 'xl' }} my="2rem">
          I enjoy creating robust and scalable frontend solutions that provide
          excellent user experiences.
        </Text>
        <Flex gap={4} flexDir={{ base: 'column', lg: 'row' }}>
          <Link to="resume" smooth={true} duration={1000}>
            <Button
              bgColor="brand.500"
              color="black"
              rounded="sm"
              minW="200px"
              h="50px"
              _hover={{ bgColor: 'brand.600' }}
            >
              <Text as="span" mx="2">
                Resume
              </Text>{' '}
              <TbArrowBigDownLineFilled />
            </Button>
          </Link>

          <Link to="about" smooth={true} duration={1000}>
            <Button
              color="brand.700"
              bgColor="white"
              variant="outline"
              borderColor="brand.blue"
              rounded="sm"
              minW="200px"
              h="50px"
              _hover={{ bgColor: 'brand.400' }}
            >
              More About me
            </Button>
          </Link>
        </Flex>
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
          transform="scaleX(-1)"
          src="illus-ttui.svg"
          alt=""
          boxSize={{
            base: '200px',
            lg: '350px',
            xl: '450px',
            '2xl': '550px',
          }}
        />

        <Stacks />
      </Flex>
    </Flex>
  );
};
