"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

interface ThreeBackgroundProps {
  frequency?: number
  range?: number
}

export function ThreeBackground({ frequency = 50, range = 5 }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const light = new THREE.PointLight(0x3b82f6, 1, 500)
    light.position.set(10, 0, 25)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.5)
    scene.add(ambientLight)

    // Geometry for particles
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)

    // Mouse tracking
    const mouse = new THREE.Vector2()
    const rangeX = new THREE.Vector2()
    const rangeY = new THREE.Vector2()

    // Probability helper function
    const probability = (n: number) => !!n && Math.random() <= n

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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Create new particles based on frequency
      if (probability((0.2 * frequency) / 80)) {
        // Create material with random blue shade
        const hue = Math.random() * 20 + 220 // Blue range
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(`hsl(${hue}, 80%, 60%)`),
          transparent: true,
          opacity: 0.8,
        })

        const cube = new THREE.Mesh(geometry, material)

        // Position based on mouse and range
        const posX = (Math.random() * range) / 2 + rangeX.x * range
        const posY = (Math.random() * range) / 2 + rangeY.x * range
        const posZ = Math.random() * 2 - 1

        cube.position.set(posX, posY, posZ)
        scene.add(cube)

        // Animate with GSAP
        gsap.to(cube.scale, {
          x: Math.random() * 1.5 + 0.5,
          y: Math.random() * 1.5 + 0.5,
          z: Math.random() * 1.5 + 0.5,
          duration: 1,
          ease: "expo.out",
        })

        gsap.to(cube.scale, {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          duration: 1,
          delay: 1,
          ease: "expo.out",
          onComplete: () => {
            scene.remove(cube)
            cube.geometry.dispose()
            material.dispose()
          },
        })

        // Add rotation
        gsap.to(cube.rotation, {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
          duration: 2,
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      geometry.dispose()
      scene.clear()
    }
  }, [frequency, range])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
