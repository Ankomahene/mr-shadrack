import { Card, Flex, Image } from '@chakra-ui/react';
import { SocialHandles } from './SocialHandles';

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Image src="mr-shadrack-dark.png" boxSize="70px" />
      <Card py="0.5rem" px="1rem" rounded="full">
        <SocialHandles />
      </Card>
    </Flex>
  );
};
