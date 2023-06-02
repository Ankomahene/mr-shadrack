import {
  Box,
  Container,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SocialHandles } from './SocialHandles';

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      py="2rem"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Image src="mr-shadrack-dark.png" boxSize="70px" />
        <Box textAlign="center">
          <Text>
            © {new Date().getFullYear()} Shadrack Ankomahene. All rights
            reserved
          </Text>
          <Link
            href="mailto: ankomaheneshadrack@gmail.com"
            fontSize="sm"
            color="brand.500"
          >
            ankomaheneshadrack@gmail.com
          </Link>
        </Box>

        <SocialHandles />
      </Container>
    </Box>
  );
};
