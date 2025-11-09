"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MannequinScene from "./MannequinScene"

interface Identity {
  id: string
  title: string
  description: string
  tags: string[]
  accentColor: string
  mannequinProps: {
    outfit: string
    props?: string[]
    backgroundType: string
  }
}

const identities: Identity[] = [
  {
    id: "student",
    title: "Engineering Physics Student",
    description:
      "Studying Engineering Physics at UBC, exploring the boundary between theory and building real things. Passionate about understanding the fundamental principles that govern our world and applying them to solve complex problems.",
    tags: ["Class of 2026", "Physics", "Mathematics", "Programming"],
    accentColor: "accent-amber",
    mannequinProps: {
      outfit: "hoodie",
      props: ["equations"],
      backgroundType: "geometric",
    },
  },
  {
    id: "builder",
    title: "Robotics & ML Builder",
    description:
      "I love building things—whether it's autonomous robots, machine learning models, or hardware systems. From designing robotic claws to training neural networks, I'm passionate about bringing intelligent systems to life through hands-on experimentation and continuous learning.",
    tags: ["Robotics", "Machine Learning", "Hardware", "Neural Networks", "Autonomous Systems"],
    accentColor: "accent-amber-light",
    mannequinProps: {
      outfit: "tshirt",
      props: ["workbench"],
      backgroundType: "minimal",
    },
  },
  {
    id: "developer",
    title: "Full Stack Developer",
    description:
      "With over 5 years of experience building web applications, I specialize in creating modern, scalable solutions. I'm passionate about clean code, user experience, and staying on top of the latest web technologies.",
    tags: ["React", "Next.js", "Python", "Full Stack"],
    accentColor: "accent-amber-dark",
    mannequinProps: {
      outfit: "tshirt",
      props: ["code"],
      backgroundType: "minimal",
    },
  },
  {
    id: "human",
    title: "Samuel",
    description:
      "Outside of work, I'm a passionate musician, a soccer player, and a social butterfly. I love to play music, play soccer, and hang out with my friends. I am involved in several school clubs in UBC and I value every genuine connection I make with people!",
    tags: ["Curiosity", "Connection", "Growth", "Balance"],
    accentColor: "accent-amber",
    mannequinProps: {
      outfit: "casual",
      props: ["chair", "plant"],
      backgroundType: "warm",
    },
  },
]

export function AboutMe() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  const nextIdentity = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % identities.length)
  }, [])

  const prevIdentity = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + identities.length) % identities.length)
  }, [])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left - next
      nextIdentity()
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous
      prevIdentity()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section id="about" className="h-full w-full py-8 md:py-20 relative overflow-y-auto hide-scrollbar">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-5 -z-10"></div>

      <div
        ref={elementRef}
        className={`h-full container mx-auto px-4 animate-on-scroll ${isVisible ? 'animate-in' : ''}`}
      >
        <div className="space-y-2 md:space-y-4 mb-4 md:mb-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">About Me</h2>
          <h3 className="text-xl md:text-2xl font-semibold text-amber-600">Get to know the different sides of who I am</h3>
        </div>
        <div 
          className="w-full max-w-7xl mx-auto flex items-center relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-0 w-full items-center">
            {/* Left: 3D Scene - Only render active scene */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[600px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <MannequinScene key={identities[currentIndex].id} identity={identities[currentIndex]} />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="relative min-h-[300px] sm:min-h-[350px] md:h-[600px]">
              {identities.map((identity, index) => (
                <div
                  key={identity.id}
                  className={`absolute inset-0 transition-all duration-300 ease-out will-change-transform ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0 z-10"
                      : index < currentIndex
                      ? "opacity-0 -translate-x-4 z-0 pointer-events-none"
                      : "opacity-0 translate-x-4 z-0 pointer-events-none"
                  }`}
                >
                  <div className="h-full flex flex-col justify-center space-y-4 md:space-y-6 px-4 md:px-8">
                    <h2 className="text-2xl md:text-5xl font-bold tracking-tighter text-amber-600">
                      {identity.title}
                    </h2>
                    <p className="text-sm md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                      {identity.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                      {identity.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevIdentity}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:bg-amber-50 hover:border-amber-300 transition-all z-10"
            aria-label="Previous identity"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-amber-600 transition-colors" />
          </button>
          <button
            onClick={nextIdentity}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:bg-amber-50 hover:border-amber-300 transition-all z-10"
            aria-label="Next identity"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 hover:text-amber-600 transition-colors" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {identities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-amber-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to identity ${index + 1}`}
              />
            ))}
          </div>

          {/* Page Indicator */}
          <div className="absolute -bottom-8 md:-bottom-12 right-4 md:right-12 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
            {currentIndex + 1}/{identities.length}
          </div>
        </div>
      </div>
    </section>
  )
}
