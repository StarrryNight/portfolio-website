"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

// Typing effect component
const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current text from the array
      const fullText = texts[currentTextIndex]

      if (isDeleting) {
        // Remove characters
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(50) // Faster when deleting
      } else {
        // Add characters
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(150) // Normal typing speed
      }

      // If completed typing the full text
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500) // Wait before deleting
      }
      // If deleted all text
      else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length) // Move to next text
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed])

  return <span className="inline-block border-r-2 border-amber-500 pr-1 animate-blink">{currentText}</span>
}

interface IntroductionProps {
  onNavigateToProjects?: () => void
}

export function Introduction({ onNavigateToProjects }: IntroductionProps = {}) {
  return (
    <section id="home" className="relative h-full md:h-full w-full overflow-hidden flex items-center py-0 md:py-0">
      <div className="container mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="inline-block mr-2 text-2xl"
                >
                  👋
                </motion.span>
                <h2 className="text-xl md:text-2xl font-medium text-amber-600">Hello there, I'm</h2>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter gradient-text">Samuel Lau</h1>

              <h2 className="text-lg md:text-3xl font-medium">
                I'm {" "}
                <TypingEffect texts={["an Engineering Physics Student", "a CAD designer", "a Software Developer", "a Tech Enthusiast"]} />
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-muted-foreground text-lg max-w-md"
            >
              Software, AI, robotics, physics
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4"
            >
              <Button
                variant="outline"
                className="border-gray-200 hover:border-amber-300 hover:text-amber-600 transition-colors"
                onClick={onNavigateToProjects}
              >
                View Projects
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <a
                href="https://github.com/StarrryNight"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="linkedin.com/in/samuel-lau-68b844282"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-amber-300 shadow-lg shadow-amber-100 animate-float">
              <Image src="./PFP.jpg" alt="Profile" fill className="object-cover" priority />
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-amber-50 rounded-full translate-x-4 -translate-y-4"></div>

            {/*<motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-5 -left-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg gold-border"
            >
              <div className="text-amber-600 font-bold">5+ Years</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-5 -right-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg gold-border"
            >
              <div className="text-amber-600 font-bold">50+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </motion.div>*/}

          </motion.div>
        </div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          <div className="text-sm font-medium mr-2 text-muted-foreground">Tech Stack:</div>
          {["SOLIDWORKS", "Python", "C", "C#", "3D Printing", "Microsoft Excel"].map((tech, index) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-50 text-gray-800 rounded-full text-sm border border-gray-200 hover:border-amber-300 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
