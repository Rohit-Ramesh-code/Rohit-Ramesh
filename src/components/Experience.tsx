import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import pecoLogo from '@/assets/peco.png';
import xrLogo from '@/assets/xrlogo.png';

interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: ExperienceData[] = [
  {
    title: 'Software Engineering Intern',
    company: 'Phillips Edison & Company',
    period: 'August 2025 - Present',
    description: [
      'Modernized legacy systems by engineering REST APIs in MRI Logic Builder, tested via Postman, and configuring Power Automate workflows to replace direct SQL with secure JSON data processing',
      "Implemented a custom API wrapper with OpenAI's GPT and RAG to extract and store categorized JSON data from 25+ legal documents in Azure Cosmos DB, automating accurate information retrieval",
      'Developed an end-to-end ETL pipeline for processing 400+ daily emails using Azure AI Studios, Azure Data Factory, and PySpark, reducing processing time by 95% and implementing robust error handling and data validation mechanisms'
    ]
  },
  {
    title: 'Undergraduate Research Fellow',
    company: 'Extended Reality Lab, University of Cincinnati',
    period: 'April 2025 - Present',
    description: [
      'Engineered an end-to-end computer vision pipeline using YOLOv8, OpenCV, Pandas, and Seaborn for real-time vehicle tracking, generating dynamic motion heatmaps that provide actionable insights into traffic flow and density patterns',
      'Architected an automated synthetic-data pipeline in Unreal Engine and NVIDIA Omniverse, integrating 3D Digital Twin reprojection and LLM summaries to slash manual labeling time by 70%',
      'Developed a multi-agent LLM framework using MTConnect which enables real-time fault diagnosis, machine control, and remote process optimization for industry partners'
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
              {experience.company === 'Phillips Edison & Company' ? (
                <img src={pecoLogo} alt="Phillips Edison & Company" className="w-8 h-8 object-contain" />
              ) : experience.company === 'Extended Reality Lab, University of Cincinnati' ? (
                <img src={xrLogo} alt="Extended Reality Lab" className="w-8 h-8 object-contain" />
              ) : (
                <Briefcase className="w-6 h-6 text-primary" />
              )}
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
