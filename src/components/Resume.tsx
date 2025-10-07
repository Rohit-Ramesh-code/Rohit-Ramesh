import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FileText, Download } from 'lucide-react';
import * as THREE from 'three';

interface FlyingPaperProps {
  isVisible: boolean;
}

function FlyingPaper({ isVisible }: FlyingPaperProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [animationTime, setAnimationTime] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Animate in when visible, animate out when not visible
    if (isVisible && animationTime < 2.5) {
      setAnimationTime(Math.min(2.5, animationTime + delta));
    } else if (!isVisible && animationTime > 0) {
      setAnimationTime(Math.max(0, animationTime - delta * 2));
    }

    const time = animationTime;
    
    if (time < 2) {
      // Flying in animation
      meshRef.current.position.y = -5 + time * 2.5;
      meshRef.current.rotation.x = Math.PI * 2 - time * Math.PI;
      meshRef.current.rotation.z = Math.sin(time * 2) * 0.3;
    } else if (time >= 2 && time < 2.5) {
      // Settling animation
      const t = (time - 2) / 0.5;
      meshRef.current.position.y = 0;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = Math.sin(time * 2) * 0.3 * (1 - t);
    } else {
      // Settled position
      meshRef.current.position.y = 0;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -5, 0]}>
      <planeGeometry args={[2, 2.8]} />
      <meshStandardMaterial 
        color="#ffffff" 
        side={THREE.DoubleSide}
        emissive="#00ffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" className="min-h-screen py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">
          My <span className="text-primary">Resume</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[500px] w-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <FlyingPaper isVisible={isVisible} />
            </Canvas>
          </div>

          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-xl space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/20 rounded-lg glow-primary">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Professional Resume</h3>
                  <p className="text-muted-foreground">Download or view my latest resume</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    University of Cincinnati<br />
                    BS in Computer Science, Minor in Business Analytics
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 text-secondary">Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    XR Lab Research Assistant<br />
                    Phillips Edison & Company - Data Analytics Intern
                  </p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform glow-primary">
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </button>

              <p className="text-sm text-center text-muted-foreground">
                Upload your resume PDF to enable the download feature
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
