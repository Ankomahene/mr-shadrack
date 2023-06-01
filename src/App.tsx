import { Box } from '@chakra-ui/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';

function App() {
  return (
    <Box w={{ base: '100%', lg: '80%' }} mx="auto" p="2rem">
      <Header />
      <Hero />
      <Experience />
    </Box>
  );
}

export default App;
