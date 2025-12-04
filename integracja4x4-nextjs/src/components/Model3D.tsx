"use client";

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, Point } from '@react-three/drei';
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
  const lightMeshesRef = useRef<THREE.Mesh[]>([]); // Store references to light meshes

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
      lightMeshesRef.current = []; // Reset array
      
      // Calculate bounding box to identify car position
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // DIAGNOSTYKA - odkomentuj aby zobaczyć wszystkie obiekty:
          // console.log('Mesh:', child.name, 'Material:', Array.isArray(child.material) ? child.material.map(m => m.name) : child.material.name, 'Position:', child.position, 'Scale:', child.scale);
          
          // UKRYJ niepotrzebne obiekty z modelu (np. ground plane, background)
          const childName = child.name?.toLowerCase() || '';
          const materialName = Array.isArray(child.material) 
            ? child.material[0]?.name?.toLowerCase() || ''
            : child.material?.name?.toLowerCase() || '';
          
          // Calculate mesh bounding box
          const meshBox = new THREE.Box3().setFromObject(child);
          const meshSize = meshBox.getSize(new THREE.Vector3());
          const meshCenter = meshBox.getCenter(new THREE.Vector3());
          
          // Ukryj obiekty które mogą być tłem/podłogą - bardziej agresywne sprawdzanie
          if (childName.includes('ground') || 
              childName.includes('floor') || 
              childName.includes('plane') ||
              childName.includes('background') ||
              childName.includes('base') ||
              childName.includes('platform') ||
              childName.includes('stand') ||
              materialName.includes('ground') ||
              materialName.includes('floor') ||
              materialName.includes('plane') ||
              // Ukryj bardzo duże obiekty (prawdopodobnie tło/podłoga)
              (meshSize.x > size.x * 0.8 && meshSize.z > size.z * 0.8 && meshSize.y < size.y * 0.1) ||
              // Ukryj obiekty bardzo nisko (poniżej samochodu)
              (meshCenter.y < center.y - size.y * 0.3)) {
            child.visible = false; // UKRYJ te obiekty
            return; // Skip further processing
          }
          
          // Handle both single material and material arrays
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          
          materials.forEach((material, index) => {
            // Check if material name contains "lamps2" (case insensitive)
            const materialName = material.name?.toLowerCase() || '';
            const meshName = child.name?.toLowerCase() || '';
            
            if (materialName.includes('lamps2') || meshName.includes('lamp') || meshName.includes('light')) {
              // Store reference to this mesh for glow effect
              lightMeshesRef.current.push(child);
              
              // Configure material for car lights
              if (material instanceof THREE.MeshStandardMaterial) {
                // Bright yellow/orange car light color
                material.emissive = new THREE.Color(0xffaa00); // Warm yellow-orange
                material.emissiveIntensity = 3.0; // Very bright
                
                // Keep other properties but make it glow
                material.roughness = 0.1;
                material.metalness = 0.0;
                material.envMapIntensity = 2.0;
                
                // Ensure it's visible
                material.transparent = false;
                material.opacity = 1;
                material.depthWrite = true;
                
                material.needsUpdate = true;
              }
            } else {
              // Regular material handling (existing code)
              if (material.map) {
                material.map.generateMipmaps = false;
                material.map.minFilter = THREE.LinearFilter;
                material.map.premultiplyAlpha = false;
              }
              
              if (material instanceof THREE.MeshStandardMaterial) {
                material.roughness = 0.4;
                material.metalness = 0.2; 
                material.envMapIntensity = 1.5;
                material.transparent = false; 
                material.depthWrite = true; 
                material.opacity = 1;
                material.alphaTest = 0;
                material.side = THREE.FrontSide;
                if (material.map) {
                  material.map.format = THREE.RGBAFormat;
                }
              }
              
              material.needsUpdate = true;
            }
          });
          
          child.renderOrder = 0; 
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
        
        {/* Car Lights with Glow Effect */}
        {lightMeshesRef.current.map((lightMesh, index) => {
          // Get world position of the light mesh
          const worldPos = new THREE.Vector3();
          lightMesh.getWorldPosition(worldPos);
          
          // Check if light is in front of car (positive Z) - only render glow for front lights
          // If you want all lights, remove this check
          const isFrontLight = worldPos.z > -1; // Adjust threshold as needed
          
          if (!isFrontLight) return null; // Skip rear lights glow
          
          return (
            <group key={`car-light-${index}`}>
              {/* Point Light for illumination */}
              <pointLight
                position={worldPos}
                color="#ffaa00"
                intensity={5}
                distance={10}
                decay={2}
              />
              
              {/* Glow Effect - Simple sphere with emissive material */}
              <mesh position={worldPos} renderOrder={999}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                  emissive="#ffaa00"
                  emissiveIntensity={2}
                  transparent
                  opacity={0.6}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  depthTest={true}
                />
              </mesh>
              
              {/* Outer glow halo */}
              <mesh position={worldPos} scale={[1.5, 1.5, 0.5]} renderOrder={998}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                  emissive="#ffaa00"
                  emissiveIntensity={1}
                  transparent
                  opacity={0.3}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  depthTest={true}
                />
              </mesh>
            </group>
          );
        })}
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
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#aaddff" />
        <spotLight position={[0, 10, 0]} intensity={3} angle={0.5} penumbra={1} />
        
        <fog attach="fog" args={['#000000', 5, 20]} /> 

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
