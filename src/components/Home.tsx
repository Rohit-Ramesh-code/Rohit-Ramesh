import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleSphere() {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.5 + (Math.random() - 0.5) * 0.2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00ffff"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-glow">
              Hello, I'm <span className="text-primary">Rohan Ramesh</span>
            </h1>
            <div className="glass-effect p-6 rounded-lg space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a second-year Computer Science major with a Business Analytics minor 
                at the University of Cincinnati. I am passionate about pursuing a career in 
                Artificial Intelligence and Data Analysis.
              </p>
              <div className="flex gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform glow-primary"
                >
                  Get in Touch
                </a>
                <a 
                  href="#resume" 
                  className="px-6 py-3 glass-effect rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
          
          <div className="h-[500px] w-full">
            <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <ParticleSphere />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
