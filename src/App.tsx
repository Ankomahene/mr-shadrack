import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ui-designs" element={<Works />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Move the home page content to a separate component
const Home = () => {
  return (
    <>
      <div className="w-full lg:w-4/5 mx-auto p-8">
        <Header />
        <Hero />
        <Experience />
        <About />
      </div>
      <div className="my-16 py-8">
        <ResumeViewer />
      </div>
      <div className="my-16 py-8">
        <Projects />
      </div>
      <div className="my-16 py-8">
        <Form />
      </div>
    </>
  );
};

export default App;
