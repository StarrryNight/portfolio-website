"use client"

import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

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
  const [frequency] = useState(40) // Reduced default frequency for elegance
  const [range] = useState(8)
  const threeContainerRef = useRef<HTMLDivElement>(null)

  // Store scene and camera references for click effect
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
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

    // Append renderer to the container
    if (threeContainerRef.current) {
      threeContainerRef.current.appendChild(renderer.domElement)
    }

    // Geometry for particles - smaller for elegance
    const geometry = new THREE.BoxGeometry(0.12, 0.12, 0.12)

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
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      rangeX.x = mouse.x - 0.25
      rangeY.x = mouse.y - 0.25
    }

    // Click effect handler
    const handleClick = (event: MouseEvent) => {
      // Convert mouse position to 3D coordinates
      const clickMouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )

      // Create burst effect
      createBurstEffect(clickMouse, scene, camera)
    }

    // Animation loop
    const animate = () => {
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
            scene.remove(cube)
            cube.geometry.dispose()
            material.dispose()
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

      renderer.render(scene, camera)
    }

    // Start animation
    animate()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)

      if (threeContainerRef.current && threeContainerRef.current.contains(renderer.domElement)) {
        threeContainerRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      geometry.dispose()
      scene.clear()

      // Clear references
      sceneRef.current = null
      cameraRef.current = null
    }
  }, [frequency, range])

  // Function to create burst effect
  const createBurstEffect = (clickPosition: THREE.Vector2, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    // Create a raycaster to get 3D position from click
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(clickPosition, camera)

    // Calculate a position for the burst (about 3 units in front of camera)
    const burstPosition = new THREE.Vector3()
    raycaster.ray.at(3, burstPosition)

    // Create particles for the burst
    const particleCount = 30 // More particles for a richer effect

    // Use smaller particles for elegance
    const burstGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08)

    // Create a group of particles with different colors from the palette
    for (let i = 0; i < particleCount; i++) {
      // Select color from light palette
      const color = LIGHT_PALETTE[Math.floor(Math.random() * LIGHT_PALETTE.length)]

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7,
        shininess: 30,
      })

      const particle = new THREE.Mesh(burstGeometry, material)

      // Set initial position at click point
      particle.position.copy(burstPosition)

      // Add to scene
      scene.add(particle)

      // Random direction for explosion - more organized pattern
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      // All particles travel similar distances
      const radius = 0.6 + Math.random() * 1.2

      const targetX = burstPosition.x + radius * Math.sin(phi) * Math.cos(theta)
      const targetY = burstPosition.y + radius * Math.sin(phi) * Math.sin(theta)
      const targetZ = burstPosition.z + radius * Math.cos(phi)

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
          scene.remove(particle)
          material.dispose()
          if (i === particleCount - 1) {
            burstGeometry.dispose()
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
  }

  return (
    <>
      {/* Three.js Container - Fixed position to cover entire site */}
      <div
        ref={threeContainerRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ pointerEvents: "none" }}
      />

    </>
  )
}
