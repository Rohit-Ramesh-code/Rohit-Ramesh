import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import faceImage from '@/assets/face.png';

interface FacePointCloudProps {
  isVisible: boolean;
}

function FacePointCloud({ isVisible }: FacePointCloudProps) {
  const points = useRef<THREE.Points>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [particlesPosition, setParticlesPosition] = useState<{
    positions: Float32Array;
    colors: Float32Array;
  }>({
    positions: new Float32Array([]),
    colors: new Float32Array([]),
  });
  
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = faceImage;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 200;
      canvas.height = 200;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const positions = [];
        const colors = [];
        
        const skipPixels = 2; // Sample every 2nd pixel for performance
        
        for (let y = 0; y < canvas.height; y += skipPixels) {
          for (let x = 0; x < canvas.width; x += skipPixels) {
            const i = (y * canvas.width + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];
            
            // Only create particles for non-transparent pixels
            if (a > 128) {
              const brightness = (r + g + b) / 3;
              
              // Convert 2D image coordinates to 3D space
              const px = (x / canvas.width - 0.5) * 3;
              const py = -(y / canvas.height - 0.5) * 3;
              const pz = (brightness / 255 - 0.5) * 0.5; // Depth based on brightness
              
              positions.push(px, py, pz);
              colors.push(r / 255, g / 255, b / 255);
            }
          }
        }
        
        setParticlesPosition({
          positions: new Float32Array(positions),
          colors: new Float32Array(colors),
        });
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setAnimationProgress(0);
    }
  }, [isVisible]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.005;
      
      if (animationProgress < 1) {
        setAnimationProgress(Math.min(1, animationProgress + 0.01));
        const scale = animationProgress;
        points.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <points ref={points} scale={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesPosition.colors.length / 3}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Home() {
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
    <section ref={sectionRef} id="home" className="min-h-screen relative flex items-center justify-center px-4 lg:pl-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <FacePointCloud isVisible={isVisible} />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-3xl space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-glow">
          Hello, I'm <span className="text-primary">Rohit Ramesh</span>
        </h1>
        <div className="glass-effect p-8 rounded-lg">
          <p className="text-xl text-foreground leading-relaxed">
            I am a second-year Computer Science major with a Business Analytics minor 
            at the University of Cincinnati. I am passionate about pursuing a career in 
            Artificial Intelligence and Data Analysis.
          </p>
        </div>
      </div>
    </section>
  );
}
