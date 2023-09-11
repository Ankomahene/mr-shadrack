import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

export const SentAlert = () => {
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
        <img src="thankyou.gif" width="60px" height="60px" alt="Thank you" />
        {/* Thanks for your message. Really Appreciate */}
      </AlertDescription>
    </Alert>
  );
};
