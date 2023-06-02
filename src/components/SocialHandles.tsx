import {
  Stack,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const SocialHandles = () => {
  return (
    <Stack direction={'row'} spacing={6}>
      <SocialButton label={'Github'} href={'https://github.com/Ankomahene'}>
        <FaGithub />
      </SocialButton>
      <SocialButton
        label={'Twitter'}
        href={'https://twitter.com/mister_shadrack'}
      >
        <FaTwitter />
      </SocialButton>
      <SocialButton
        label={'LinkedIn'}
        href={'https://www.linkedin.com/in/shadrack-ankomahene-5a393311a/'}
      >
        <FaLinkedin />
      </SocialButton>
      {/* <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton> */}
    </Stack>
  );
};
