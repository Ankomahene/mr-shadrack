import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SentAlertMain } from './SentAlert';

export const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const handleSendMessage = () => {
    if (message && name && email) {
      setIsSending(true);
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name,
            email,
            message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_ID
        )
        .then(() => {
          setSent(true);
          setIsSending(false);
        })
        .catch((e) => {
          setIsSending(false);
        });
    } else {
      toast({
        title: 'One of the fields is empty',
        status: 'error',
        position: 'top',
      });
    }
  };

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
        {sent ? (
          <SentAlertMain />
        ) : (
          <div>
            <Box my="1rem">
              <Text m="10px">Name</Text>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Den"
                required
              />
            </Box>
            <Box my="1rem">
              <Text m="10px">Email</Text>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@example.com"
                required
              />
            </Box>
            <Box my="1rem">
              <Text m="10px">Message</Text>
              <Textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                type="button"
                onClick={handleSendMessage}
                disabled={isSending}
                opacity={isSending ? 0.2 : 1}
              >
                {isSending ? 'Sending Message' : 'Send'}
              </Button>
            </Box>
          </div>
        )}
      </Card>
    </Box>
  );
};
