import { useEffect, useRef, useState } from 'react';
import { FolderGit2, Calendar } from 'lucide-react';

interface ProjectData {
  title: string;
  location: string;
  period: string;
  description: string[];
}

const projects: ProjectData[] = [
  {
    title: 'NeedleHelp',
    location: 'University of Cincinnati, Cincinnati, OH',
    period: 'March 2025 - May 2025',
    description: [
      "Built an ML predictive model using Scikit-learn's Random Forest and Pandas, deploying it via a Flask REST API to stream real-time surgical guidance and integration with modern OR workflows.",
      'Secured 1st Place Overall at RevolutionUC 2025 among 100+ teams for innovation in surgical automation of the placement of subdermal needle electrodes'
    ]
  },
  {
    title: 'Movie Recommendation System',
    location: 'University of Cincinnati, Cincinnati, OH',
    period: 'December 2024 - January 2025',
    description: [
      'Developed an item-based collaborative filtering system using R and Python, boosting recommendation accuracy by 20%',
      'Utilized R libraries (like caret and recommenderlab) and Python (with pandas and numpy) to implement the filtering algorithm for optimized movie suggestions'
    ]
  }
];

function ProjectCard({ project, isVisible }: { project: ProjectData; isVisible: boolean }) {
  return (
    <div
      className={`glass-effect p-8 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-lg glow-primary">
          <FolderGit2 className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-lg text-primary mb-2">{project.location}</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{project.period}</span>
          </div>
        </div>
      </div>
      
      <ul className="space-y-3 mt-6">
        {project.description.map((item, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3 text-muted-foreground"
            style={{ 
              animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s both` : 'none' 
            }}
          >
            <span className="text-primary mt-1">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Projects() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndex(index);
          }
        },
        { threshold: 0.3 }
      );

      if (card) {
        observer.observe(card);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">
          My <span className="text-primary">Projects</span>
        </h2>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className="min-h-[250px]"
            >
              <ProjectCard 
                project={project} 
                isVisible={visibleIndex === index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
