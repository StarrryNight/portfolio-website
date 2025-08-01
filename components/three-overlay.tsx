"use client"

import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { Settings, X } from "lucide-react"

// Lighter white and grey palette (no gold)
const LIGHT_PALETTE = [
  "#ffffff", // Pure white
  "#fafafa", // Very light grey
  "#f8f8f8", // Very light grey
  "#f5f5f5", // Very light grey
  "#f2f2f2", // Very light grey
  "#f0f0f0", // Light grey
  "#eeeeee", // Light grey
  "#e8e8e8", // Light grey
]

export function ThreeOverlay() {
  const [showControls, setShowControls] = useState(false)
  const [frequency, setFrequency] = useState(40) // Reduced default frequency for elegance
  const [range, setRange] = useState(8)
  const threeContainerRef = useRef<HTMLDivElement>(null)

  // Store scene and camera references for click effect
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  
  // Store pending click effects
  const clickEffectsRef = useRef<Array<{position: THREE.Vector3, timestamp: number}>>([])
  
  // Track if component is mounted to prevent animation during cleanup
  const mountedRef = useRef(true)

  useEffect(() => {
    // Set mounted flag
    mountedRef.current = true
    
    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Store references for click effect
    sceneRef.current = scene
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background

    // Ensure canvas is positioned correctly
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.right = '0'
    renderer.domElement.style.bottom = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'none'
    renderer.domElement.style.zIndex = '0'

    // Append renderer to the container
    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement)
    }

    // Geometry for particles - smaller for elegance
    const geometry = new THREE.BoxGeometry(0.12, 0.12, 0.12)
    const burstGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08)

    // Light - softer light for the elegant theme
    const light = new THREE.PointLight(0xffffff, 1, 500)
    light.position.set(10, 0, 25)
    scene.add(light)

    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    // Mouse tracking
    const mouse = new THREE.Vector2()
    const rangeX = new THREE.Vector2()
    const rangeY = new THREE.Vector2()

    // Probability helper function
    const probability = (n: number) => !!n && Math.random() <= n

    // Get random color from palette
    const getRandomColor = () => {
      return LIGHT_PALETTE[Math.floor(Math.random() * LIGHT_PALETTE.length)]
    }

    // Handle window resize
    const handleResize = () => {
      if (!mountedRef.current) return
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      
      // Ensure canvas maintains proper positioning after resize
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
    }

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountedRef.current) return
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      rangeX.x = mouse.x - 0.25
      rangeY.x = mouse.y - 0.25
    }

    // Click effect handler - now just stores the click for processing in animate loop
    const handleClick = (event: MouseEvent) => {
      if (!mountedRef.current) return
      
      // Convert mouse position to 3D coordinates
      const clickMouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )

      // Calculate 3D position from click coordinates
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(clickMouse, camera)

      // Create a plane at the camera's near plane distance
      const nearPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), camera.near)
      const burstPosition = new THREE.Vector3()
      
      // Find intersection with the near plane
      raycaster.ray.intersectPlane(nearPlane, burstPosition)
      
      // If no intersection, use a simple calculation
      if (!burstPosition || isNaN(burstPosition.x)) {
        // Simple fallback: calculate position based on click coordinates
        const fov = camera.fov * (Math.PI / 180)
        const aspect = camera.aspect
        const distance = 2
        
        const x = Math.tan(fov / 2) * aspect * distance * clickMouse.x
        const y = Math.tan(fov / 2) * distance * clickMouse.y
        
        burstPosition.set(x, y, -distance)
      }

      // Store the click effect for processing in the animate loop
      clickEffectsRef.current.push({
        position: burstPosition.clone(),
        timestamp: Date.now()
      })
    }

    // Animation loop - now handles both particle generation and click effects
    const animate = () => {
      if (!mountedRef.current) return
      
      requestAnimationFrame(animate)

      // Create new particles based on frequency
      if (probability((0.2 * frequency) / 80)) {
        const color = getRandomColor()

        // Create material with color from palette - very light and transparent
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.5, // More transparent for subtlety
          shininess: 20,
        })

        const cube = new THREE.Mesh(geometry, material)

        // Position based on mouse and range
        const posX = (Math.random() * range) / 2 + rangeX.x * range
        const posY = (Math.random() * range) / 2 + rangeY.x * range
        const posZ = Math.random() * 2 - 1

        cube.position.set(posX, posY, posZ)
        scene.add(cube)

        // Animate with GSAP - smaller scale for subtlety
        const scaleFactor = 1.0
        gsap.to(cube.scale, {
          x: Math.random() * scaleFactor + 0.3,
          y: Math.random() * scaleFactor + 0.3,
          z: Math.random() * scaleFactor + 0.3,
          duration: 1,
          ease: "expo.out",
        })

        gsap.to(cube.scale, {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          duration: 1.2,
          delay: 1,
          ease: "expo.out",
          onComplete: () => {
            if (mountedRef.current && scene.children.includes(cube)) {
              scene.remove(cube)
              cube.geometry.dispose()
              material.dispose()
            }
          },
        })

        // Add gentle rotation - more subtle for elegance
        gsap.to(cube.rotation, {
          x: Math.random() * Math.PI,
          y: Math.random() * Math.PI,
          z: Math.random() * Math.PI,
          duration: 2.5,
          ease: "power1.inOut",
        })
      }

      // Process click effects
      const currentTime = Date.now()
      const clickEffects = clickEffectsRef.current
      
      for (let i = clickEffects.length - 1; i >= 0; i--) {
        const effect = clickEffects[i]
        
        // Only process effects that are recent (within 100ms)
        if (currentTime - effect.timestamp < 100) {
          // Create burst particles
          const particleCount = 30
          
          for (let j = 0; j < particleCount; j++) {
            const color = LIGHT_PALETTE[Math.floor(Math.random() * LIGHT_PALETTE.length)]
            
            const material = new THREE.MeshPhongMaterial({
              color: new THREE.Color(color),
              transparent: true,
              opacity: 0.7,
              shininess: 30,
            })

            const particle = new THREE.Mesh(burstGeometry, material)
            particle.position.copy(effect.position)
            scene.add(particle)

            // Random direction for explosion
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI
            const radius = 0.6 + Math.random() * 1.2

            const targetX = effect.position.x + radius * Math.sin(phi) * Math.cos(theta)
            const targetY = effect.position.y + radius * Math.sin(phi) * Math.sin(theta)
            const targetZ = effect.position.z + radius * Math.cos(phi)

            // Animate explosion
            gsap.to(particle.position, {
              x: targetX,
              y: targetY,
              z: targetZ,
              duration: 0.9 + Math.random() * 0.5,
              ease: "power2.out",
            })

            // Scale up slightly then down
            const maxScale = 1.3 + Math.random()
            gsap.to(particle.scale, {
              x: maxScale,
              y: maxScale,
              z: maxScale,
              duration: 0.3,
              ease: "power1.out",
              onComplete: () => {
                gsap.to(particle.scale, {
                  x: 0.01,
                  y: 0.01,
                  z: 0.01,
                  duration: 0.6,
                  delay: 0.2,
                  ease: "power1.in",
                })
              },
            })

            // Fade out and cleanup
            gsap.to(material, {
              opacity: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power1.in",
              onComplete: () => {
                if (mountedRef.current && scene.children.includes(particle)) {
                  scene.remove(particle)
                  material.dispose()
                }
              },
            })

            // Add rotation
            gsap.to(particle.rotation, {
              x: Math.random() * Math.PI * 2,
              y: Math.random() * Math.PI * 2,
              z: Math.random() * Math.PI * 2,
              duration: 1.5,
              ease: "power1.inOut",
            })
          }
          
          // Remove this effect from the queue
          clickEffects.splice(i, 1)
        }
      }

      if (mountedRef.current) {
        renderer.render(scene, camera)
      }
    }

    // Start animation
    animate()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Cleanup
    return () => {
      // Set mounted flag to false to stop animation
      mountedRef.current = false
      
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)

      if (threeContainerRef.current && threeContainerRef.current.contains(renderer.domElement)) {
        threeContainerRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      geometry.dispose()
      burstGeometry.dispose()
      scene.clear()

      // Clear references
      sceneRef.current = null
      cameraRef.current = null
      clickEffectsRef.current = []
    }
  }, [frequency, range])

  return (
    <>
      {/* Three.js Container - Fixed position to cover entire site */}
      <div
        ref={threeContainerRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          transform: "translateZ(0)"
        }}
      />

      {/* Controls Button - Fixed position - updated to elegant style with gold accent */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-amber-300 transition-colors"
        aria-label="Background Controls"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Controls Panel - Fixed position - updated to elegant style with gold accents */}
      {showControls && (
        <div className="fixed bottom-20 right-6 z-50 bg-white/90 backdrop-blur-md border border-gray-200 w-64 rounded-lg shadow-lg">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm text-gray-800 font-medium">Background Controls</h3>
              <button
                onClick={() => setShowControls(false)}
                className="text-gray-500 hover:text-amber-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Frequency</span>
                <span className="text-xs text-amber-600 font-medium">{frequency}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={frequency}
                onChange={(e) => setFrequency(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer elegant-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Range</span>
                <span className="text-xs text-amber-600 font-medium">{range}</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={range}
                onChange={(e) => setRange(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer elegant-slider"
              />
            </div>

            {/* Color palette visualization */}
            <div className="mt-2">
              <div className="text-xs text-gray-600 mb-2">Color Palette</div>
              <div className="flex h-3 w-full rounded-md overflow-hidden border border-gray-200">
                {LIGHT_PALETTE.map((color, index) => (
                  <div key={index} className="flex-1" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            </div>

            <div className="text-xs text-center text-amber-600 mt-2 font-medium">
              Click anywhere for a burst effect!
            </div>
          </div>
        </div>
      )}
    </>
  )
}
