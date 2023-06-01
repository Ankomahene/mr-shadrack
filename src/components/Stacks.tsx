import { Box, Image } from '@chakra-ui/react';

export const Stacks = () => {
  return (
    <Box
      border="1px"
      borderRadius="50%"
      borderColor="blue.200"
      borderStyle="dotted"
      pos="absolute"
      boxSize={{ base: '250px', lg: '400px', xl: '500px', '2xl': '650px' }}
      className="circle"
    >
      <button className="btn btn1">
        <Image src="react.svg" alt="" />
      </button>
      <button className="btn btn2">
        <Image src="angular.svg" alt="" />
      </button>
      <button className="btn btn3">
        <Image src="typescript.svg" alt="" />
      </button>
      <button className="btn btn4">
        <Image src="html5.svg" alt="" />
      </button>
      <button className="btn btn5">
        <Image src="css3.svg" alt="" />
      </button>
      <button className="btn btn6">
        <Image src="javascript.svg" alt="" />
      </button>
    </Box>
  );
};
