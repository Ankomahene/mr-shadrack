import { Card, Flex } from '@chakra-ui/react';
import { SocialHandles } from './SocialHandles';

export const Header = () => {
  return (
    <Flex justify="flex-end" align="center" id="header">
      <Card py="0.5rem" px="1rem" rounded="full">
        <SocialHandles />
      </Card>
    </Flex>
  );
};
