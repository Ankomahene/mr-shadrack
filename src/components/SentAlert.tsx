import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

export const SentAlertMain = () => {
  return (
    <Alert
      w={{ base: '100%', lg: '80%' }}
      mx="auto"
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Message submitted to Mr. Shadrack!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thank you for your message. Will get back to you as soon as possible
      </AlertDescription>
    </Alert>
  );
};
