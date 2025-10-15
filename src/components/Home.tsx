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
  const [targetPositions, setTargetPositions] = useState<Float32Array>(new Float32Array([]));
  const [colors, setColors] = useState<Float32Array>(new Float32Array([]));
  const randomOffsets = useRef<Float32Array>(new Float32Array([]));
  
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = faceImage;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 150;
      canvas.height = 150;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const positions = [];
        const colorData = [];
        const offsets = [];
        
        const skipPixels = 2;
        
        for (let y = 0; y < canvas.height; y += skipPixels) {
          for (let x = 0; x < canvas.width; x += skipPixels) {
            const i = (y * canvas.width + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];
            
            if (a > 128) {
              const brightness = (r + g + b) / 3;
              
              const px = (x / canvas.width - 0.5) * 4;
              const py = -(y / canvas.height - 0.5) * 4;
              const pz = (brightness / 255 - 0.5) * 0.8;
              
              positions.push(px, py, pz);
              colorData.push(r / 255, g / 255, b / 255);
              
              // Random offset for particle start position
              offsets.push(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
              );
            }
          }
        }
        
        setTargetPositions(new Float32Array(positions));
        setColors(new Float32Array(colorData));
        randomOffsets.current = new Float32Array(offsets);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setAnimationProgress(0);
    }
  }, [isVisible]);

  useFrame((state) => {
    if (points.current && targetPositions.length > 0) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      if (animationProgress < 1 && isVisible) {
        setAnimationProgress(Math.min(1, animationProgress + 0.015));
        
        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
        
        for (let i = 0; i < targetPositions.length / 3; i++) {
          const i3 = i * 3;
          positions[i3] = randomOffsets.current[i3] + (targetPositions[i3] - randomOffsets.current[i3]) * easeProgress;
          positions[i3 + 1] = randomOffsets.current[i3 + 1] + (targetPositions[i3 + 1] - randomOffsets.current[i3 + 1]) * easeProgress;
          positions[i3 + 2] = randomOffsets.current[i3 + 2] + (targetPositions[i3 + 2] - randomOffsets.current[i3 + 2]) * easeProgress;
        }
        
        points.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // Gentle rotation
      points.current.rotation.y += 0.003;
    }
  });

  if (targetPositions.length === 0) return null;

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={targetPositions.length / 3}
          array={new Float32Array(targetPositions.length)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.95}
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
