import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: ExperienceData[] = [
  {
    title: 'XR Lab Research Assistant',
    company: 'XR Lab - University of Cincinnati',
    period: 'September 2024 - Present',
    description: [
      'Developing immersive virtual reality experiences using Unity and C#',
      'Implementing computer vision algorithms for hand tracking and gesture recognition',
      'Collaborating with interdisciplinary team on AR/VR research projects',
      'Conducting user studies and analyzing interaction data'
    ]
  },
  {
    title: 'Data Analytics Intern',
    company: 'Phillips Edison & Company',
    period: 'May 2024 - August 2024',
    description: [
      'Analyzed retail performance data using Python and SQL for 300+ shopping centers',
      'Created interactive dashboards in Power BI to visualize key metrics',
      'Developed predictive models to forecast tenant performance',
      'Automated data processing workflows, reducing analysis time by 40%'
    ]
  }
];

function ExperienceCard({ experience, isVisible }: { experience: ExperienceData; isVisible: boolean }) {
  return (
    <div
      className={`glass-effect p-8 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-lg glow-primary">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
          <p className="text-lg text-primary mb-2">{experience.company}</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{experience.period}</span>
          </div>
        </div>
      </div>
      
      <ul className="space-y-3 mt-6">
        {experience.description.map((item, index) => (
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

export default function Experience() {
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
    <section id="experience" className="min-h-screen py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">
          Work <span className="text-primary">Experience</span>
        </h2>
        
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className="min-h-[400px]"
            >
              <ExperienceCard 
                experience={experience} 
                isVisible={visibleIndex === index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
