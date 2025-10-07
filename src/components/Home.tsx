import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import faceImage from '@/assets/face.png';

function FacePointCloud() {
  const points = useRef<THREE.Points>(null);
  const texture = useLoader(THREE.TextureLoader, faceImage);
  
  const particlesPosition = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = faceImage;
    
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
      
      return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
      };
    }
    
    return {
      positions: new Float32Array([]),
      colors: new Float32Array([]),
    };
  }, []);

  useEffect(() => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={points}>
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
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center px-4 lg:pr-72">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <FacePointCloud />
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
