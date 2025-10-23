"use client";

import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ screenSize = 'mobile' }: { screenSize?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const rotateIconRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = React.useState(false);
  
  // Ładujemy model GLB (zawiera geometrię, materiały i tekstury)
  const gltf = useLoader(GLTFLoader, '/models/Toyota70_2.glb');
  
  console.log('GLTF loaded:', gltf);
  console.log('Model loaded state:', modelLoaded);

  useEffect(() => {
    if (gltf && gltf.scene) {
      const model = gltf.scene;
      
      // Wyśrodkuj model w przestrzeni 3D (tylko raz przy ładowaniu)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Przesuń model tak, żeby jego środek był w (0,0,0) - tylko X i Z
      model.position.x -= center.x;
      model.position.z -= center.z;
      // Y zostanie ustawione w getPosition() - nie dotykamy tutaj
      
      console.log('Model center:', center);
      console.log('Model size:', size);
      
      // GLB już ma materiały, ale możemy je dostosować
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            // Ustaw materiały jako matowe i stonowane
            if (child.material instanceof THREE.MeshStandardMaterial) {
              // Wyłącz emissję
              if (child.material.emissive) {
                child.material.emissive.setHex(0x000000);
              }
              child.material.emissiveIntensity = 0;
              
              // Zmniejsz intensywność kolorów - stonowane kolory
              if (child.material.color) {
                // Przyciemnij kolor o 30%
                child.material.color.multiplyScalar(0.7);
              }
              
              // Ustaw jako matowy z większą szorstkością
              child.material.metalness = 0.1;
              child.material.roughness = 0.8;
              
              // Zmniejsz intensywność światła odbijanego
              child.material.envMapIntensity = 0.3;
            }
            
            child.material.needsUpdate = true;
          }
        }
      });
      
      // Oznacz model jako załadowany
      setModelLoaded(true);
    }
  }, [gltf]);

  useFrame((state) => {
    if (meshRef.current) {
      // Model nie obraca się automatycznie - zatrzymany
      // meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    if (rotateIconRef.current) {
      // Ikona obrotu obraca się szybko w drugą stronę
      rotateIconRef.current.rotation.z = -state.clock.elapsedTime * 0.7;
    }
  });

  const getScale = () => {
    switch (screenSize) {
      case 'mobile': return [2.5, 2.5, 2.5];
      case 'xs': return [3, 3, 3];
      case 'sm': return [3.5, 3.5, 3.5];
      case 'md': return [3, 3, 3];
      case 'lg': return [3, 3, 3];
      default: return [3.5, 3.5, 3.5];
    }
  };
  
  const scale = getScale();
  
  const getPosition = () => {
    switch (screenSize) {
      case 'mobile': return [0, 0.5, 0]; // Wyżej na telefonie
      case 'xs': return [0, 0.3, 0];
      case 'sm': return [0, 0.2, 0];
      case 'md': return [0, 0, 0];
      case 'lg': return [0, 0, 0];
      default: return [0, 0, 0];
    }
  };
  
  const position = getPosition();
  
  // Nie renderuj modelu dopóki się nie załaduje
  if (!modelLoaded || !gltf || !gltf.scene) {
    console.log('Model not ready:', { modelLoaded, gltf: !!gltf, scene: !!(gltf?.scene) });
    return null;
  }

  return (
    <group ref={meshRef} rotation={[0, -Math.PI / 6, 0]}>
      <primitive 
        object={gltf.scene} 
        scale={scale} 
        position={position}
      />
      
      {/* Ikona obrotu – elegancka, animowana */}
     <group ref={rotateIconRef} position={[0, position[1] - (screenSize === 'mobile' ? 2 : 3), 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Delikatnie obracający się torus */}
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[1.4, 0.08, 16, 100, Math.PI * 1.75]} />
        <meshStandardMaterial
          color="#F4A460"
          metalness={0.6}
          roughness={0.2}
          emissive="#FFD39B"
          emissiveIntensity={0.5}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Czubek strzałki */}
      <mesh position={[-0.1, -1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.5, 16]} />
        <meshStandardMaterial
          color="#FFB347"
          metalness={0.6}
          roughness={0.3}
          emissive="#FFD39B"
          emissiveIntensity={0.7}
        />
      </mesh>

      
    </group>

    </group>
  );
}

export default function Model3D() {
  // Sprawdź rozmiar ekranu
  const [screenSize, setScreenSize] = React.useState('mobile');
  
  React.useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) setScreenSize('mobile');
        else if (window.innerWidth < 700) setScreenSize('xs');
        else if (window.innerWidth < 1024) setScreenSize('sm');
        else if (window.innerWidth < 1400) setScreenSize('md');
        else if (window.innerWidth < 1700) setScreenSize('lg');
        else setScreenSize('xl');
      }
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  return (
    <div className="w-[700px] h-[300px] sm:h-[400px] lg:h-[600px] relative flex items-center justify-center lg:-ml-48">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-transparent to-yellow-200/30 rounded-lg blur-2xl scale-x-125 scale-y-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-yellow-100/20 rounded-lg blur-xl scale-x-110 scale-y-95"></div>
      
      <Canvas
        camera={{ 
          position: screenSize === 'mobile' ? [0, 0.8, 5] : [0, 1.2, 7], 
          fov: screenSize === 'mobile' ? 60 : 60 
        }}
        style={{ background: 'transparent' }}
        className="relative z-10 w-full h-full"
      >
        {/* Światło - zmniejszona intensywność dla stonowanego wyglądu */}
        <ambientLight intensity={1.2} />
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1.2} />
        <directionalLight position={[0, -10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[10, -10, 5]} intensity={0.6} />
        <pointLight position={[0, 5, 10]} intensity={0.5} />
        <spotLight position={[0, 15, 0]} intensity={1.0} angle={0.5} penumbra={0.3} />
        
        {/* Model */}
        <Suspense fallback={null}>
          <Model screenSize={screenSize} />
        </Suspense>
        
        {/* Kontrola kamery */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          autoRotateSpeed={0.5}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
