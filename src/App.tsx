import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { Works } from './pages/Works';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResumeViewer } from './components/ResumeViewer';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Form } from './components/Form';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui-designs" element={<Works />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Move the home page content to a separate component
const Home = () => {
  return (
    <>
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
      <Box my="4rem" py="2rem">
        <Form />
      </Box>
    </>
  );
};

export default App;
