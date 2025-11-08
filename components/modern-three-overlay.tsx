'use client'

import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { Settings, X } from "lucide-react"

// Modern color palette
const MODERN_PALETTE = [
  "#ffffff", // Pure white
  "#fafafa", // Very light grey
  "#f8f8f8", // Very light grey
  "#f5f5f5", // Very light grey
  "#f2f2f2", // Very light grey
  "#f0f0f0", // Light grey
  "#eeeeee", // Light grey
  "#e8e8e8", // Light grey
]

interface Particle {
  mesh: THREE.Mesh
  originalPosition: THREE.Vector3
  velocity: THREE.Vector3
  targetPosition: THREE.Vector3
}

export function ModernThreeOverlay() {
  const [showControls, setShowControls] = useState(false)
  const [frequency, setFrequency] = useState(40)
  const [range, setRange] = useState(8)
  const [intensity, setIntensity] = useState(0.5)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup with modern settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Create particles with modern geometry
    const particleCount = 200
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.02, 8, 6)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHex(
          parseInt(MODERN_PALETTE[Math.floor(Math.random() * MODERN_PALETTE.length)].replace('#', '0x'))
        ),
        transparent: true,
        opacity: 0.6
      })

      const mesh = new THREE.Mesh(geometry, material)
      
      // Random position
      mesh.position.x = (Math.random() - 0.5) * 20
      mesh.position.y = (Math.random() - 0.5) * 20
      mesh.position.z = (Math.random() - 0.5) * 20

      const particle: Particle = {
        mesh,
        originalPosition: mesh.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        targetPosition: mesh.position.clone()
      }

      particles.push(particle)
      scene.add(mesh)
    }

    particlesRef.current = particles

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Click effect
    const handleClick = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Create ripple effect
      particlesRef.current.forEach((particle, index) => {
        const distance = Math.sqrt(
          Math.pow(particle.mesh.position.x - x * 10, 2) +
          Math.pow(particle.mesh.position.y - y * 10, 2)
        )

        if (distance < 3) {
          const force = (3 - distance) / 3
          particle.velocity.x += (Math.random() - 0.5) * force * 0.1
          particle.velocity.y += (Math.random() - 0.5) * force * 0.1
          particle.velocity.z += (Math.random() - 0.5) * force * 0.1
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    // Animation loop using modern requestAnimationFrame
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      particlesRef.current.forEach((particle, index) => {
        // Smooth movement
        particle.mesh.position.add(particle.velocity)

        // Apply damping
        particle.velocity.multiplyScalar(0.99)

        // Mouse interaction
        const mouseInfluence = 0.1
        particle.velocity.x += (mouse.x * 10 - particle.mesh.position.x) * mouseInfluence * 0.001
        particle.velocity.y += (mouse.y * 10 - particle.mesh.position.y) * mouseInfluence * 0.001

        // Frequency-based oscillation
        const frequencyMultiplier = frequency / 100
        particle.mesh.position.x += Math.sin(time * frequencyMultiplier + index * 0.1) * 0.001
        particle.mesh.position.y += Math.cos(time * frequencyMultiplier + index * 0.1) * 0.001

        // Range constraint
        const distance = particle.mesh.position.distanceTo(particle.originalPosition)
        if (distance > range) {
          const direction = particle.originalPosition.clone().sub(particle.mesh.position).normalize()
          particle.velocity.add(direction.multiplyScalar(0.01))
        }

        // Intensity-based opacity
        particle.mesh.material.opacity = 0.3 + Math.sin(time + index) * intensity * 0.3
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose of resources
      particlesRef.current.forEach(particle => {
        particle.mesh.geometry.dispose()
        if (Array.isArray(particle.mesh.material)) {
          particle.mesh.material.forEach(mat => mat.dispose())
        } else {
          particle.mesh.material.dispose()
        }
      })
      
      renderer.dispose()
    }
  }, [frequency, range, intensity])

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 -z-10 pointer-events-auto"
      />
      
      {/* Modern controls */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
        >
          <Settings className="h-5 w-5 text-white" />
        </button>
      </div>

      {showControls && (
        <div className="fixed top-4 right-16 z-50 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 min-w-[200px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Particle Controls</h3>
            <button
              onClick={() => setShowControls(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Frequency: {frequency}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Range: {range}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Intensity: {intensity}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

