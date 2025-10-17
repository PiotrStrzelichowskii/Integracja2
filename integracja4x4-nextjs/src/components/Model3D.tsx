"use client";

import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ screenSize = 'mobile' }: { screenSize?: string }) {
  const meshRef = useRef<THREE.Group>(null);
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
      // Wolna rotacja modelu
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const getScale = () => {
    switch (screenSize) {
      case 'mobile': return [2, 2, 2];
      case 'xs': return [2, 2, 2];
      case 'sm': return [2.5, 2.5, 2.5];
      case 'md': return [1.4, 1.4, 1.4];
      case 'lg': return [2, 2, 2];
      default: return [2.5, 2.5, 2.5];
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
    <group ref={meshRef}>
      <primitive 
        object={gltf.scene} 
        scale={scale} 
        position={position}
      />
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
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative flex items-center justify-center">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-transparent to-yellow-200/30 rounded-lg blur-2xl scale-125"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-yellow-100/20 rounded-lg blur-xl scale-110"></div>
      <Canvas
        camera={{ 
          position: screenSize === 'mobile' ? [0, 1.5, 5] : [0, 2, 7], 
          fov: screenSize === 'mobile' ? 50 : 45 
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
          autoRotate={true}
          autoRotateSpeed={0.5}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
