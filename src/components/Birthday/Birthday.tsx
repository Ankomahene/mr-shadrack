import {
  Textarea,
  Flex,
  Box,
  Text,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { BirthdayHero } from './BirthdayHero';
import { useState } from 'react';
import { SentAlert } from './SentAlert';
import emailjs from '@emailjs/browser';

export const Birthday = () => {
  const [sent, setSent] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSendMessage = () => {
    if (message) {
      emailjs
        .send(
          'service_xsbnvpp',
          'template_by16aar',
          {
            name: name || 'Anonymous',
            message,
          },
          'sSnfRVlvCiYocGS6L'
        )
        .then(() => {
          setSent(true);
        });
    } else {
      toast({
        title: 'Please enter a message',
        status: 'error',
        position: 'top',
      });
    }
  };

  return (
    <>
      <Box w={{ base: '100%', lg: '80%' }} mx="auto" p="2rem">
        <Header />
        <BirthdayHero />
      </Box>

      {sent ? (
        <SentAlert />
      ) : (
        <Box w={{ base: '100%', lg: '80%' }} mx="auto">
          <Textarea
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={12}
          ></Textarea>
          <Flex align="center" my={4}>
            {!show && (
              <Text mr="5px">If you want me to know who wrote it, </Text>
            )}
            <Button
              onClick={() => setShow(!show)}
              variant="link"
              colorScheme="blue"
            >
              {show ? 'Click here to Hide' : 'Click Here'}
            </Button>
          </Flex>
          {show && (
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Flex justify="flex-end">
            <Button onClick={handleSendMessage} colorScheme="blue" mt="5">
              <Text as="span" mr="5px">
                Send
              </Text>{' '}
              <BiSend />
            </Button>
          </Flex>
        </Box>
      )}
      <Footer />
    </>
  );
};
