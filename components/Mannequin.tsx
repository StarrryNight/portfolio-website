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

export default function Mannequin({ identity }: MannequinProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Subtle breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.02
    }
  })

  // Amber color palette
  const getColor = () => {
    const colorMap: Record<string, string> = {
      "accent-amber": "#F59E0B", // amber-500
      "accent-amber-light": "#FCD34D", // amber-300
      "accent-amber-dark": "#D97706", // amber-600
      "accent-orange": "#F97316", // orange-500
      "accent-yellow": "#EAB308", // yellow-500
    }
    return colorMap[identity.accentColor] || "#F59E0B"
  }

  const accentColor = getColor()

  return (
    <group ref={groupRef} position={[0, -0.3, -0.5]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.8} />
      </mesh>

      {/* Body/Torso */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial
          color={identity.mannequinProps.outfit === "hoodie" ? accentColor : "#E8E8E8"}
          roughness={0.7}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.4, 1.1, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial
          color={identity.mannequinProps.outfit === "hoodie" ? accentColor : "#E8E8E8"}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[0.4, 1.1, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial
          color={identity.mannequinProps.outfit === "hoodie" ? accentColor : "#E8E8E8"}
          roughness={0.7}
        />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D0D0D0" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D0D0D0" roughness={0.7} />
      </mesh>

      {/* Props based on identity */}
      {identity.mannequinProps.props?.includes("equations") && (
        <group position={[0.6, 1.3, 0]}>
          <mesh>
            <planeGeometry args={[0.3, 0.4]} />
            <meshStandardMaterial color={accentColor} opacity={0.3} transparent />
          </mesh>
        </group>
      )}

      {identity.mannequinProps.props?.includes("workbench") && (
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[1, 0.1, 0.5]} />
          <meshStandardMaterial color={accentColor} opacity={0.4} transparent />
        </mesh>
      )}

      {identity.mannequinProps.props?.includes("chair") && (
        <mesh position={[0, 0.2, -0.3]}>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color={accentColor} opacity={0.3} transparent />
        </mesh>
      )}

      {identity.mannequinProps.props?.includes("plant") && (
        <mesh position={[0.5, 0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2]} />
          <meshStandardMaterial color={accentColor} />
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#10B981" />
          </mesh>
        </mesh>
      )}

      {identity.mannequinProps.props?.includes("code") && (
        <group position={[0.6, 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} opacity={0.5} transparent />
          </mesh>
        </group>
      )}
    </group>
  )
}

