import { useEffect, useRef, useState } from 'react';
import { Code2, Database, Cloud, Cpu, Terminal, Wrench } from 'lucide-react';
import pythonLogo from '@/assets/python-logo.png';
import javascriptLogo from '@/assets/javascript-logo.png';
import cppLogo from '@/assets/cpp-logo.png';
import rLogo from '@/assets/r-logo.png';

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
}

const skillsData: Skill[] = [
  { name: 'Python', category: 'Programming Languages', level: 90, icon: <img src={pythonLogo} alt="Python" className="w-8 h-8" /> },
  { name: 'JavaScript', category: 'Programming Languages', level: 85, icon: <img src={javascriptLogo} alt="JavaScript" className="w-8 h-8" /> },
  { name: 'C++', category: 'Programming Languages', level: 80, icon: <img src={cppLogo} alt="C++" className="w-8 h-8" /> },
  { name: 'R', category: 'Programming Languages', level: 75, icon: <img src={rLogo} alt="R" className="w-8 h-8" /> },
  
  { name: 'React', category: 'Frontend Development', level: 85, icon: <Code2 className="w-8 h-8" /> },
  { name: 'Tailwind CSS', category: 'Frontend Development', level: 90, icon: <Code2 className="w-8 h-8" /> },
  { name: 'HTML', category: 'Frontend Development', level: 95, icon: <Code2 className="w-8 h-8" /> },
  
  { name: 'Node.js', category: 'Backend Development', level: 80, icon: <Terminal className="w-8 h-8" /> },
  
  { name: 'PyTorch', category: 'AI/ML', level: 85, icon: <Cpu className="w-8 h-8" /> },
  { name: 'TensorFlow', category: 'AI/ML', level: 80, icon: <Cpu className="w-8 h-8" /> },
  { name: 'Pandas', category: 'AI/ML', level: 90, icon: <Cpu className="w-8 h-8" /> },
  { name: 'OpenCV', category: 'AI/ML', level: 75, icon: <Cpu className="w-8 h-8" /> },
  { name: 'Scikit-learn', category: 'AI/ML', level: 85, icon: <Cpu className="w-8 h-8" /> },
  { name: 'Seaborn', category: 'AI/ML', level: 80, icon: <Cpu className="w-8 h-8" /> },
  
  { name: 'MySQL', category: 'Database', level: 85, icon: <Database className="w-8 h-8" /> },
  { name: 'PostgreSQL', category: 'Database', level: 80, icon: <Database className="w-8 h-8" /> },
  { name: 'SQLite', category: 'Database', level: 85, icon: <Database className="w-8 h-8" /> },
  { name: 'Microsoft SQL Server', category: 'Database', level: 75, icon: <Database className="w-8 h-8" /> },
  
  { name: 'Docker', category: 'DevOps', level: 75, icon: <Cloud className="w-8 h-8" /> },
  { name: 'Azure', category: 'DevOps', level: 70, icon: <Cloud className="w-8 h-8" /> },
  
  { name: 'Git', category: 'Other', level: 90, icon: <Wrench className="w-8 h-8" /> },
  { name: 'Linux', category: 'Other', level: 85, icon: <Wrench className="w-8 h-8" /> },
  { name: 'Arduino', category: 'Other', level: 70, icon: <Wrench className="w-8 h-8" /> },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setProgress(skill.level);
          }, index * 50);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, index]);

  return (
    <div
      ref={cardRef}
      className={`glass-effect p-6 rounded-lg transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="text-primary animate-pulse-glow">
          {skill.icon}
        </div>
        <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out glow-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = [...new Set(skillsData.map(skill => skill.category))];

  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">
          Technical <span className="text-primary">Skills</span>
        </h2>
        
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="space-y-8">
              <h3 className="text-2xl font-semibold text-secondary mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
