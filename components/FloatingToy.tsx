"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, Suspense, useRef, useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import * as THREE from "three";
import { product } from "@/lib/product";

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="100%"
          className="h-full w-full object-cover"
          priority
          style={{ objectPosition: "center" }}
        />
      </div>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="100%"
          className="h-full w-full object-cover"
          priority
          style={{ objectPosition: "center" }}
        />
      </div>
    </div>
  );
}

const hairClumps = [
  { position: [0, 1.02, -0.1], rotation: [-0.08, 0, 0], scale: [0.9, 0.34, 0.68] },
  { position: [-0.43, 0.95, 0.02], rotation: [0.08, -0.18, -0.2], scale: [0.5, 0.38, 0.42] },
  { position: [0.43, 0.96, 0.02], rotation: [0.08, 0.18, 0.2], scale: [0.5, 0.38, 0.42] },
  { position: [-0.68, 0.7, -0.02], rotation: [0.1, -0.28, -0.1], scale: [0.3, 0.48, 0.3] },
  { position: [0.68, 0.7, -0.02], rotation: [0.1, 0.28, 0.1], scale: [0.3, 0.48, 0.3] },
  { position: [0, 0.8, -0.44], rotation: [0.15, 0, 0], scale: [0.7, 0.5, 0.3] },
  { position: [-0.35, 0.64, -0.46], rotation: [0.12, -0.22, 0.08], scale: [0.36, 0.52, 0.22] },
  { position: [0.35, 0.64, -0.46], rotation: [0.12, 0.22, -0.08], scale: [0.36, 0.52, 0.22] }
] as const;

const frontBangs = [
  { position: [-0.52, 0.93, 0.54], rotation: [0.16, -0.2, -0.78], scale: [0.13, 0.46, 0.08] },
  { position: [-0.34, 1.0, 0.6], rotation: [0.18, -0.12, -0.5], scale: [0.15, 0.5, 0.08] },
  { position: [-0.1, 1.04, 0.64], rotation: [0.2, -0.04, -0.18], scale: [0.16, 0.56, 0.08] },
  { position: [0.16, 1.02, 0.61], rotation: [0.18, 0.08, 0.2], scale: [0.14, 0.5, 0.08] },
  { position: [0.42, 0.94, 0.54], rotation: [0.14, 0.18, 0.58], scale: [0.12, 0.42, 0.07] },
  { position: [0.0, 0.9, 0.67], rotation: [0.22, 0.02, 0.08], scale: [0.1, 0.34, 0.06] }
] as const;

const backHairStrands = [
  { position: [-0.54, 0.58, -0.48], rotation: [Math.PI + 0.22, -0.18, -0.16], radius: 0.07, height: 0.66 },
  { position: [-0.36, 0.54, -0.56], rotation: [Math.PI + 0.12, -0.08, 0.06], radius: 0.065, height: 0.74 },
  { position: [-0.14, 0.56, -0.61], rotation: [Math.PI + 0.18, 0.04, -0.08], radius: 0.07, height: 0.72 },
  { position: [0.1, 0.55, -0.62], rotation: [Math.PI + 0.1, 0.03, 0.09], radius: 0.07, height: 0.75 },
  { position: [0.32, 0.55, -0.56], rotation: [Math.PI + 0.18, 0.08, -0.03], radius: 0.065, height: 0.7 },
  { position: [0.53, 0.6, -0.48], rotation: [Math.PI + 0.24, 0.18, 0.16], radius: 0.07, height: 0.64 }
] as const;

const furWisps = [
  { position: [-0.55, 1.1, 0.18], rotation: [0.85, -0.18, 2.48], length: 0.42, color: "light" },
  { position: [-0.25, 1.24, 0.12], rotation: [0.95, -0.1, 2.85], length: 0.46, color: "highlight" },
  { position: [0.08, 1.27, 0.08], rotation: [0.9, 0.06, 3.18], length: 0.48, color: "highlight" },
  { position: [0.38, 1.18, 0.13], rotation: [0.82, 0.14, 3.55], length: 0.42, color: "light" },
  { position: [-0.7, 0.86, -0.04], rotation: [0.4, -0.2, 2.76], length: 0.5, color: "shadow" },
  { position: [0.7, 0.86, -0.04], rotation: [0.4, 0.2, 3.5], length: 0.5, color: "shadow" },
  { position: [-0.5, 0.75, -0.5], rotation: [2.88, -0.2, -0.12], length: 0.54, color: "light" },
  { position: [-0.2, 0.75, -0.62], rotation: [2.98, -0.08, 0.08], length: 0.6, color: "highlight" },
  { position: [0.18, 0.75, -0.62], rotation: [2.94, 0.08, -0.06], length: 0.6, color: "light" },
  { position: [0.5, 0.75, -0.5], rotation: [2.88, 0.2, 0.12], length: 0.54, color: "shadow" }
] as const;

const hoodieMaterial = new THREE.MeshStandardMaterial({
  color: "#080a12",
  roughness: 0.72,
  metalness: 0.08
});

const blueMaterial = new THREE.MeshStandardMaterial({
  color: "#00AEEF",
  emissive: "#00AEEF",
  emissiveIntensity: 0.55,
  roughness: 0.36
});

const faceMaterial = new THREE.MeshStandardMaterial({
  color: "#ffeedc",
  roughness: 0.9
});

const hairMaterial = new THREE.MeshStandardMaterial({
  color: "#d9dedf",
  roughness: 0.96
});

const hairHighlightMaterial = new THREE.MeshStandardMaterial({
  color: "#f4f6f4",
  roughness: 0.94
});

const hairShadowMaterial = new THREE.MeshStandardMaterial({
  color: "#9fa7aa",
  roughness: 0.98
});

function PlushToyModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.45,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.2,
      0.08
    );
    groupRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <mesh position={[0, -1.35, 0]} receiveShadow>
        <cylinderGeometry args={[1.04, 1.18, 0.18, 64]} />
        <meshStandardMaterial color="#f6f8fb" roughness={0.5} />
      </mesh>
      <mesh position={[0, -1.08, 0]} receiveShadow>
        <cylinderGeometry args={[0.13, 0.19, 0.56, 32]} />
        <meshStandardMaterial color="#eef3f8" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.45, 0]} scale={[0.88, 0.92, 0.72]} castShadow>
        <sphereGeometry args={[0.82, 48, 48]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.56, -0.03]} scale={[1.02, 0.88, 0.74]} castShadow>
        <sphereGeometry args={[0.92, 64, 64]} />
        <primitive object={faceMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.65, -0.18]} rotation={[Math.PI / 2, 0, 0]} scale={[1.12, 1.12, 0.38]}>
        <torusGeometry args={[0.82, 0.18, 24, 80, Math.PI * 1.2]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.96, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.028, 16, 80, Math.PI * 1.25]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.35, 0.56, 0.64]} rotation={[0.04, 0, 0.04]} scale={[1.25, 0.82, 0.08]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0.35, 0.56, 0.64]} rotation={[0.04, 0, -0.04]} scale={[1.25, 0.82, 0.08]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.35, 0.55, 0.67]} scale={[1.35, 0.92, 0.06]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#02040a" roughness={0.55} />
      </mesh>
      <mesh position={[0.35, 0.55, 0.67]} scale={[1.35, 0.92, 0.06]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#02040a" roughness={0.55} />
      </mesh>
      <mesh position={[-0.35, 0.58, 0.72]} scale={[0.75, 0.52, 0.04]}>
        <sphereGeometry args={[0.19, 32, 32]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0.35, 0.58, 0.72]} scale={[0.75, 0.52, 0.04]}>
        <sphereGeometry args={[0.19, 32, 32]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.15, 0.74]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.12, 0.012, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#050507" roughness={0.4} />
      </mesh>
      <group>
        <mesh position={[0, 0.88, -0.1]} rotation={[0.08, 0, 0]} scale={[1.04, 0.48, 0.78]} castShadow>
          <sphereGeometry args={[1, 48, 32]} />
          <primitive object={hairShadowMaterial} attach="material" />
        </mesh>
        {hairClumps.map((clump, index) => (
          <mesh
            key={`hair-clump-${index}`}
            position={clump.position}
            rotation={clump.rotation}
            scale={clump.scale}
            castShadow
          >
            <sphereGeometry args={[1, 32, 24]} />
            <primitive object={index % 3 === 0 ? hairHighlightMaterial : hairMaterial} attach="material" />
          </mesh>
        ))}
        {frontBangs.map((bang, index) => (
          <mesh
            key={`front-bang-${index}`}
            position={bang.position}
            rotation={bang.rotation}
            scale={bang.scale}
            castShadow
          >
            <sphereGeometry args={[1, 32, 18]} />
            <primitive object={index === 2 ? hairHighlightMaterial : hairMaterial} attach="material" />
          </mesh>
        ))}
        {backHairStrands.map((strand, index) => (
          <mesh key={`back-hair-${index}`} position={strand.position} rotation={strand.rotation} castShadow>
            <coneGeometry args={[strand.radius, strand.height, 8]} />
            <primitive object={index % 2 === 0 ? hairMaterial : hairHighlightMaterial} attach="material" />
          </mesh>
        ))}
        {furWisps.map((wisp, index) => {
          const material =
            wisp.color === "highlight"
              ? hairHighlightMaterial
              : wisp.color === "shadow"
                ? hairShadowMaterial
                : hairMaterial;

          return (
            <mesh key={`fur-wisp-${index}`} position={wisp.position} rotation={wisp.rotation} castShadow>
              <cylinderGeometry args={[0.012, 0.02, wisp.length, 8]} />
              <primitive object={material} attach="material" />
            </mesh>
          );
        })}
      </group>
      <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.88, 0.055, 18, 80, Math.PI]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.86, 0.56, 0.1]} scale={[0.22, 0.32, 0.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[0.86, 0.56, 0.1]} scale={[0.22, 0.32, 0.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.72, -0.62, 0.1]} rotation={[0, 0, 0.72]} castShadow>
        <cylinderGeometry args={[0.19, 0.22, 0.7, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[0.72, -0.62, 0.1]} rotation={[0, 0, -0.72]} castShadow>
        <cylinderGeometry args={[0.19, 0.22, 0.7, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.98, -0.88, 0.14]} scale={[0.32, 0.24, 0.32]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e7e9ee" roughness={0.9} />
      </mesh>
      <mesh position={[0.98, -0.88, 0.14]} scale={[0.32, 0.24, 0.32]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e7e9ee" roughness={0.9} />
      </mesh>
      <mesh position={[-0.85, -0.18, 0.04]} rotation={[0.1, 0, -0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.68, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[0.85, -0.18, 0.04]} rotation={[0.1, 0, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.68, 32]} />
        <primitive object={hoodieMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.74, -0.31, 0.28]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 16]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0.74, -0.31, 0.28]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 16]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -0.28, 0.67]} scale={[0.42, 0.08, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f7fbff" roughness={0.4} />
      </mesh>
      <mesh position={[-0.56, -0.98, 0.38]} rotation={[0.1, 0.3, 0.34]}>
        <cylinderGeometry args={[0.028, 0.028, 0.38, 16]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
      <mesh position={[0.56, -0.98, 0.38]} rotation={[0.1, -0.3, -0.34]}>
        <cylinderGeometry args={[0.028, 0.028, 0.38, 16]} />
        <primitive object={blueMaterial} attach="material" />
      </mesh>
    </group>
  );
}

function ToyScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 6], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={3} color="#00AEEF" />
      <pointLight position={[3, 2, 4]} intensity={2} color="#dff7ff" />
      <PlushToyModel />
    </Canvas>
  );
}

export default function FloatingToy({ className = "" }: { className?: string }) {
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`relative h-[420px] w-full md:h-[560px] ${className}`} data-cursor="active">
        <LoadingFallback />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative h-[420px] w-full md:h-[560px] ${className}`} data-cursor="active">
        <ErrorFallback />
      </div>
    );
  }

  return (
    <div 
      className={`relative h-[420px] w-full md:h-[560px] overflow-hidden ${className}`} 
      data-cursor="active"
    >
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary onError={setError}>
          <ToyScene />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode; onError: (e: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: (e: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
