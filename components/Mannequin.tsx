"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Identity {
  id: string
  accentColor: string
  mannequinProps: {
    outfit: string
    props?: string[]
    backgroundType: string
  }
}

interface MannequinProps {
  identity: Identity
}

// Color mapping for accent colors
const getAccentColor = (accentColor: string): string => {
  const colorMap: Record<string, string> = {
    "accent-amber": "#F59E0B", // amber-500
    "accent-amber-light": "#FCD34D", // amber-300
    "accent-amber-dark": "#D97706", // amber-600
    "accent-orange": "#F97316", // orange-500
    "accent-yellow": "#EAB308", // yellow-500
  }
  return colorMap[accentColor] || "#F59E0B"
}

export default function Mannequin({ identity }: MannequinProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cubeRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const cylinderRef = useRef<THREE.Mesh>(null)

  const accentColor = getAccentColor(identity.accentColor)

  // Animate the geometric shapes
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Rotate the entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3
    }

    // Individual shape rotations
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.5
      cubeRef.current.rotation.y = time * 0.5
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 1.5) * 0.1
    }

    if (cylinderRef.current) {
      cylinderRef.current.rotation.z = time * 0.4
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cube - Center */}
      <mesh ref={cubeRef} position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Sphere - Top */}
      <mesh ref={sphereRef} position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* Cylinder - Bottom */}
      <mesh ref={cylinderRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 32]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Additional smaller shapes for visual interest */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.6}
          metalness={0.3}
          opacity={0.7}
          transparent
        />
      </mesh>

      <mesh position={[0.8, 0.5, 0]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.5}
          metalness={0.4}
          opacity={0.7}
          transparent
        />
      </mesh>
    </group>
  )
}


