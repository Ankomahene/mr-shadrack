import { Box } from '@chakra-ui/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { ResumeViewer } from './components/ResumeViewer';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Box w={{ base: '100%', lg: '80%' }} mx="auto" p="2rem">
        <Header />
        <Hero />
        <Experience />
        <About />
      </Box>
      <Box my="4rem" py="2rem">
        <ResumeViewer />
      </Box>
      <Box my="4rem" py="2rem">
        <Projects />
      </Box>
      <Footer />
    </>
  );
}

export default App;
