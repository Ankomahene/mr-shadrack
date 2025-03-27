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
import { GitHubContribution } from './components/GitHubContribution';

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
        <div className="my-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            GitHub Activity
          </h2>
          <GitHubContribution username="ankomahene" />
          <p className="text-muted-foreground mt-4 text-sm">
            This activity graph represents my contributions to open-source and
            personal projects over the last two years.
          </p>
        </div>
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
