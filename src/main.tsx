import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// import App from './App.tsx';
import './index.css';
import { Birthday } from './components/Birthday/Birthday.tsx';

const colors = {
  brand: {
    500: 'hsl(221,83%,53%)',
    600: 'hsl(221,83%,43%)',
    700: 'hsl(221,83%,33%)',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Birthday />
    </ChakraProvider>
  </React.StrictMode>
);
