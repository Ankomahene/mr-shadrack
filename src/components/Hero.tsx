import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Frame } from './Frame';
import { BsDownload } from 'react-icons/bs';
import { Stacks } from './Stacks';
import { Link } from 'react-scroll';

export const Hero = () => {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }} my="2rem">
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
          <ChakraLink href="resume.pdf" download="shadrack-resume.pdf">
            <Button
              bgColor="brand.500"
              color="white"
              rounded="sm"
              minW="200px"
              h="50px"
              _hover={{ bgColor: 'brand.600' }}
            >
              <Text as="span" mx="2">
                Resume
              </Text>{' '}
              <BsDownload />
            </Button>
          </ChakraLink>
          <Link to="moreAboutMe" smooth={true} duration={1000}>
            <Button
              color="brand.500"
              bgColor="white"
              variant="outline"
              borderColor="brand.blue"
              rounded="sm"
              minW="200px"
              h="50px"
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
          src="illustration1.svg"
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
