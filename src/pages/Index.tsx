import Home from '@/components/Home';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Home />
      <Skills />
      <Experience />
      <Resume />
      <Contact />
    </div>
  );
};

export default Index;
