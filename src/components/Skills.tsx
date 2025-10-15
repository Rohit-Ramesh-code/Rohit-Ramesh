import { useEffect, useRef, useState } from 'react';
import { Code2, Database, Cloud, Cpu, Terminal, Wrench } from 'lucide-react';
import pythonLogo from '@/assets/python_logo.png';
import javascriptLogo from '@/assets/JavaScript_logo.png';
import cppLogo from '@/assets/cplusplus_logo.png';
import rLogo from '@/assets/R_logo.png';
import pytorchLogo from '@/assets/pytorch_logo.png';
import nodejsLogo from '@/assets/nodejs_logo.png';
import htmlLogo from '@/assets/html_logo.png';
import reactLogo from '@/assets/React_logo.png';
import tailwindLogo from '@/assets/tailwindcss_logo.png';
import sklearnLogo from '@/assets/sklearn_logo.png';
import opencvLogo from '@/assets/opencv_logo.png';
import pandasLogo from '@/assets/pandas_logo.png';
import tensorflowLogo from '@/assets/tensorflow_logo.png';
import seabornLogo from '@/assets/seaborn_logo.png';
import mssqlLogo from '@/assets/micosqlserver_logo.png';
import sqliteLogo from '@/assets/sqlite_logo.png';
import postgresqlLogo from '@/assets/postgresql_logo.png';
import mysqlLogo from '@/assets/mysql_logo.png';
import arduinoLogo from '@/assets/arduino_logo.png';
import linuxLogo from '@/assets/linux_logo.png';
import gitLogo from '@/assets/git_logo.png';
import azureLogo from '@/assets/azure_logo.png';
import dockerLogo from '@/assets/docker_logo.png';

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
}

const skillsData: Skill[] = [
  { name: 'Python', category: 'Programming Languages', level: 90, icon: <img src={pythonLogo} alt="Python" className="w-8 h-8" /> },
  { name: 'JavaScript', category: 'Programming Languages', level: 85, icon: <img src={javascriptLogo} alt="JavaScript" className="w-8 h-8" /> },
  { name: 'R', category: 'Programming Languages', level: 75, icon: <img src={rLogo} alt="R" className="w-8 h-8" /> },
  { name: 'C++', category: 'Programming Languages', level: 80, icon: <img src={cppLogo} alt="C++" className="w-8 h-8" /> },
  
  { name: 'React', category: 'Frontend Development', level: 85, icon: <img src={reactLogo} alt="React" className="w-8 h-8" /> },
  { name: 'Tailwind CSS', category: 'Frontend Development', level: 90, icon: <img src={tailwindLogo} alt="Tailwind CSS" className="w-8 h-8" /> },
  { name: 'HTML', category: 'Frontend Development', level: 95, icon: <img src={htmlLogo} alt="HTML" className="w-8 h-8" /> },
  
  { name: 'Node.js', category: 'Backend Development', level: 80, icon: <img src={nodejsLogo} alt="Node.js" className="w-8 h-8" /> },
  
  { name: 'PyTorch', category: 'AI/ML', level: 85, icon: <img src={pytorchLogo} alt="PyTorch" className="w-8 h-8" /> },
  { name: 'OpenCV', category: 'AI/ML', level: 75, icon: <img src={opencvLogo} alt="OpenCV" className="w-8 h-8" /> },
  { name: 'TensorFlow', category: 'AI/ML', level: 80, icon: <img src={tensorflowLogo} alt="TensorFlow" className="w-8 h-8" /> },
  { name: 'Pandas', category: 'AI/ML', level: 90, icon: <img src={pandasLogo} alt="Pandas" className="w-8 h-8" /> },
  { name: 'Scikit-learn', category: 'AI/ML', level: 85, icon: <img src={sklearnLogo} alt="Scikit-learn" className="w-8 h-8" /> },
  { name: 'Seaborn', category: 'AI/ML', level: 80, icon: <img src={seabornLogo} alt="Seaborn" className="w-8 h-8" /> },
  
  { name: 'MySQL', category: 'Database', level: 90, icon: <img src={mysqlLogo} alt="MySQL" className="w-8 h-8" /> },
  { name: 'Microsoft SQL Server', category: 'Database', level: 90, icon: <img src={mssqlLogo} alt="Microsoft SQL Server" className="w-8 h-8" /> },
  { name: 'SQLite', category: 'Database', level: 85, icon: <img src={sqliteLogo} alt="SQLite" className="w-8 h-8" /> },
  { name: 'PostgreSQL', category: 'Database', level: 70, icon: <img src={postgresqlLogo} alt="PostgreSQL" className="w-8 h-8" /> },
  
  { name: 'Docker', category: 'DevOps', level: 75, icon: <img src={dockerLogo} alt="Docker" className="w-8 h-8" /> },
  { name: 'Azure', category: 'DevOps', level: 70, icon: <img src={azureLogo} alt="Azure" className="w-8 h-8" /> },
  
  { name: 'Git', category: 'Other', level: 90, icon: <img src={gitLogo} alt="Git" className="w-8 h-8" /> },
  { name: 'Linux', category: 'Other', level: 85, icon: <img src={linuxLogo} alt="Linux" className="w-8 h-8" /> },
  { name: 'Arduino', category: 'Other', level: 70, icon: <img src={arduinoLogo} alt="Arduino" className="w-8 h-8" /> },
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

        {(() => {
          const specialMap: Record<string, { label: string; sticks: number }> = {
            'Python': { label: 'Advanced', sticks: 3 },
            'JavaScript': { label: 'Intermediate', sticks: 2 },
            'C++': { label: 'Beginner', sticks: 1 },
            'R': { label: 'Intermediate', sticks: 1 },
            'React': { label: 'Beginner', sticks: 1 },
            'Tailwind CSS': { label: 'Beginner', sticks: 1 },
            'HTML': { label: 'Beginner', sticks: 1 },
            'Node.js': { label: 'Beginner', sticks: 1 },
            'PyTorch': { label: 'Intermediate', sticks: 1 },
            'TensorFlow': { label: 'Beginner', sticks: 1 },
            'Pandas': { label: 'Beginner', sticks: 1 },
            'OpenCV': { label: 'Intermediate', sticks: 2 },
            'Scikit-learn': { label: 'Beginner', sticks: 1 },
            'Seaborn': { label: 'Beginner', sticks: 1 },
            'MySQL': { label: 'Advanced', sticks: 4 },
            'PostgreSQL': { label: 'Intermediate', sticks: 2 },
            'SQLite': { label: 'Intermediate', sticks: 3 },
            'Microsoft SQL Server': { label: 'Advanced', sticks: 4 },
            'Docker': { label: 'Intermediate', sticks: 1 },
            'Azure': { label: 'Intermediate', sticks: 1 },
            'Git': { label: 'Advanced', sticks: 4 },
            'Linux': { label: 'Intermediate', sticks: 2 },
            'Arduino': { label: 'Beginner', sticks: 1 },
          };

          const entry = specialMap[skill.name];
          if (entry) {
            const sticks = 'I'.repeat(entry.sticks);
            return (
              <div className="flex flex-col items-center space-y-2">
                <div className="text-sm font-semibold text-primary">{entry.label}</div>
                <div className="text-white font-extrabold text-2xl tracking-wider">{sticks}</div>
              </div>
            );
          }

          return (
            <>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out glow-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </>
          );
        })()}
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
