import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.tsx';
import './index.css';

const colors = {
  brand: {
    400: 'hsl(78, 100%, 89%)',
    500: 'hsl(77, 100%, 66%)',
    600: 'hsl(77, 76%, 59%)',
    700: 'hsl(77, 76%, 43%)',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
