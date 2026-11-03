import { About } from '../components/home/About.tsx';
import { Contact } from '../components/home/Contact.tsx';
import { Experience } from '../components/home/Experience.tsx';
import { Hero } from '../components/home/Hero.tsx';
import { JournalTeaser } from '../components/home/JournalTeaser.tsx';
import { MoreWork } from '../components/home/MoreWork.tsx';
import { Proof } from '../components/home/Proof.tsx';
import { SelectedWork } from '../components/home/SelectedWork.tsx';
import { useProjects } from '../lib/data.ts';
import { useSeo } from '../lib/seo.ts';

export function Home() {
  useSeo({});
  const { data: projects } = useProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Hero />
      <Proof />
      <SelectedWork projects={featured} />
      <MoreWork projects={rest} />
      <Experience />
      <About />
      <JournalTeaser />
      <Contact />
    </>
  );
}
