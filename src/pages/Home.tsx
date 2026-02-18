
import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { GitHubContribution } from '../components/GitHubContribution';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Form } from '../components/Form';
import { WorkExperience } from '../components/WorkExperience';

export const Home = () => {
  return (
    <>
      <div className="w-full lg:w-4/5 mx-auto p-8">
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
        <WorkExperience />
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
