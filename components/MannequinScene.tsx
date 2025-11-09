"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import Mannequin from "./Mannequin"

interface Identity {
  id: string
  accentColor: string
  mannequinProps: {
    outfit: string
    props?: string[]
    backgroundType: string
  }
}

interface MannequinSceneProps {
  identity: Identity
}

export default function MannequinScene({ identity }: MannequinSceneProps) {
  return (
    <Canvas
      camera={{ position: [3, 0.5, 4], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      className="bg-white"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 2, 2]} intensity={0.3} />
        <Mannequin identity={identity} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={2.5}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          target={[0, 0.3, 0]}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}


