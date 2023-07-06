import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

export const Form = () => {
  return (
    <Box>
      <Box
        bgColor="brand.500"
        p="2rem"
        color="white"
        textAlign="center"
        id="projects"
        h="250px"
      >
        <Heading>Send a Message</Heading>
        <Text py="1rem">Got a Question or Want to Reach out?</Text>
      </Box>
      <Card
        bg="white"
        mt="-6rem"
        w={{ base: '100%', lg: '80%' }}
        mx="auto"
        p="1rem"
        rounded="sm"
      >
        <form name="contact" netlify>
          <Box my="1rem">
            <Text m="10px">Name</Text>
            <Input type="text" name="name" placeholder="John Den" required />
          </Box>
          <Box my="1rem">
            <Text m="10px">Email</Text>
            <Input
              type="email"
              name="email"
              placeholder="username@example.com"
              required
            />
          </Box>
          <Box my="1rem">
            <Text m="10px">Message</Text>
            <Textarea
              name="message"
              placeholder="Type your message here"
              required
            />
          </Box>
          <Box my="1rem">
            <Button
              _hover={{ bgColor: 'brand.600' }}
              bgColor="brand.500"
              color="gray.100"
              w="100%"
              type="submit"
            >
              Send
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};
