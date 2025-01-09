import { Box, Flex, Link as ChakraLink, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      mb={8}
      p={8}
      w={{ base: '100%', lg: '80%' }}
      mx="auto"
    >
      <Flex align="center">
        <ChakraLink as={RouterLink} to="/" fontSize="lg" fontWeight="bold">
          <Image src="mr-shadrack-dark.png" boxSize="70px" />
        </ChakraLink>
      </Flex>

      <Box display="flex" gap={4}>
        <ChakraLink
          as={RouterLink}
          to="/ui-designs"
          fontSize="lg"
          fontWeight="bold"
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
        >
          UI/UX Designs
        </ChakraLink>
        {/* Add other navigation items */}
      </Box>
    </Flex>
  );
};
