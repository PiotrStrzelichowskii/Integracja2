"use client";

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Fallback Component if WebGL Crashes ---
const WebGLFallback = () => (
  <div className="w-full h-full absolute inset-0">
    <Image 
      src="/heropic.jpg" 
      alt="Off-road Hero Fallback" 
      fill 
      className="object-cover object-[25%_center] sm:object-center"
      priority
    />
    {/* Dark Overlay mirroring the one in Hero.tsx */}
    <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
  </div>
);

function CarModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Toyota70_2.glb');
  const { viewport } = useThree();

  const isMobile = viewport.width < 5;
  const xPos = isMobile ? 0 : 1.8; // Move to right on desktop (approx 1/3 shift)

  useGSAP(() => {
    if (!meshRef.current) return;

    // STAN POCZĄTKOWY (Po załadowaniu strony):
    // Model jest daleko (z: -6), nisko i LEKKO obrócony
    // Dodajemy offset X, żeby na starcie był bardziej z prawej (x: 1.0 dla grupy + offset xPos z prymitywu)
    gsap.set(meshRef.current.position, { z: -6, y: -0.7, x: 1 }); 
    gsap.set(meshRef.current.rotation, { y: 0.3 }); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "+=1500",
        pin: true,
        anticipatePin: 1, // <--- DODAJ TO (eliminuje mignięcie przy odpinaniu)
        scrub: 1,
      },
    });

    // ANIMACJA (Podczas scrollowania w dół):
    // Auto podjeżdża (z: 0), wraca na środek (x: 0) i lekko skręca
    tl.to(meshRef.current.position, {
      z: 0, 
      y: -0.2,
      x: 0, // Animujemy grupę do zera (offset xPos jest w prymitywie)
      ease: "none", // LINEARNA animacja (powoli przez cały czas)
    }, 0)
    .to(meshRef.current.rotation, {
      y: -Math.PI / 14,
      ease: "none", // LINEARNA animacja (jednostajny obrót przez cały scroll)
    }, 0);

  }, { dependencies: [scene] });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
           // OPTIMIZATION: Simplify materials to prevent crashes
           if (child.material.map) {
             child.material.map.generateMipmaps = false; // Save memory
             child.material.map.minFilter = THREE.LinearFilter;
           }
           
           // Use simpler material settings
           if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.5;
            child.material.metalness = 0.1; // Lower metalness is cheaper (less reflection calc)
            child.material.envMapIntensity = 0.5;
          }
          
          // Disable shadow casting/receiving for performance
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={meshRef}>
      <ParallaxGroup>
        <primitive 
          object={scene} 
          scale={[2.5, 2.5, 2.5]} 
          position={[xPos, -0.2, 0]}
          rotation={[0, -Math.PI / 14, 0]}
        />
      </ParallaxGroup>
    </group>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const { mouse } = state;
      // Very subtle parallax
      const targetX = (mouse.y || 0) * 0.02;
      const targetY = (mouse.x || 0) * 0.02;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Model3D() {
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL Context Lost - Switching to Fallback');
      setContextLost(true);
    };

    // Attach to window/canvas if possible, but R3F handles it internally usually.
    // We can listen on the canvas element if we had a ref, but global listener helps.
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
    }

    return () => {
      if (canvas) canvas.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, []);

  if (contextLost) {
    return <WebGLFallback />;
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas
        className="pointer-events-auto"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            setContextLost(true);
          }, false);
        }}
        gl={{ 
          antialias: false,
          powerPreference: "default", // Avoid forcing high-perf GPU which might be unstable
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 1, 6], fov: 45 }}
        dpr={[1, 1]} // Strict 1x DPI for stability
      >
        {/* Replaced heavy Environment with simple Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#aaddff" />
        
        <fog attach="fog" args={['#000000', 5, 20]} /> 

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
