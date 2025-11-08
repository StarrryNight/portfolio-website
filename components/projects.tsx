"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Project = {
  title: string
  shortDescription: string
  detailedDescription: string
  image: string
  tags: string[]
  category: string
  liveUrl: string
  githubUrl: string
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = [
    {
      title: "Neuromap",
      shortDescription: "An interactive knowledge mapping and visualization application that combines powerful graph visualization with AI-powered explanations to help users understand and document complex relationships between concepts.",
      detailedDescription: "Neuronmap is a visual tool for mapping how ideas connect. You create nodes for concepts and draw connections between them. When you select parts of your map, an AI explains how those ideas relate.\n\nThink of it like a mind map or concept map, but interactive: you can drag nodes, connect them in different ways, and get AI explanations of the relationships you've drawn. It helps you visualize and understand complex topics by showing connections visually and explaining them in plain language.\n\nThe app has two parts: a visual interface where you build your map, and an AI system that analyzes your selections and explains the relationships. You can create different types of nodes (like main ideas, secondary ideas, and details) and connect them with different line styles to show different kinds of relationships.\n\nIt's useful for learning, organizing thoughts, documenting systems, or exploring how concepts relate. The AI acts like a teacher, helping you understand the connections you've mapped.",
      image: "/neuromap.png",
      tags: ["React", "tailwind CSS",  "JavaScript" , "MySQL"],
      category: "Software",
      liveUrl: "https://www.neuromap.link/",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      shortDescription: "A modern, interactive portfolio website featuring dynamic Three.js backgrounds and engaging click effects",
      detailedDescription: "A modern, interactive portfolio website featuring dynamic Three.js backgrounds and engaging click effects. Built with Next.js 15, React 19, and TypeScript, this website showcases my projects and experiences with a beautiful, responsive design. The site includes smooth animations powered by Framer Motion, interactive 3D elements using Three.js and React Three Fiber, and a comprehensive UI component library built with Radix UI and Tailwind CSS. Features include a horizontal pager navigation system, project showcases with detailed dialogs, experience timelines, and a fully responsive design that works seamlessly across all devices.",
      image: "/portfolio.png",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Radix UI"],
      category: "Software",
      liveUrl: "https://portfolio-website-jade-seven-38.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Audio Spatial Transformer",
      shortDescription: "A React web application that generates spatial audio in a 3D environment. Experience immersive 3D sound by positioning a speaker in 3D space relative to a mannequin listener.",
      detailedDescription: "A modern, interactive portfolio website featuring dynamic Three.js backgrounds and engaging click effects. Built with Next.js and React, this website showcases my projects and experiences with a beautiful, responsive design.",
      image: "/spatial-transform.png",
      tags: ["React", "tailwind CSS", "Three.js", "JavaScript"],
      category: "Software",
      liveUrl: "https://audio-spatial-transform-9kfye5z5t-starrrynights-projects.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Tetris Practice Simulator",
      shortDescription: "A Unity Tetris game with custom scenarios for practicing advanced techniques",
      detailedDescription: "A Unity-based Tetris game designed specifically for practicing advanced techniques like T-spins, combos, and other competitive strategies. Features custom scenario building capabilities, allowing players to set up specific board states for targeted practice. Used in a school club for training purposes.",
      image: "./tetris-thumbnail.png",
      tags: ["C#", "Unity"],
      category: "Software",
      liveUrl: "https://play.unity.com/en/games/574578bb-2258-40e1-ab7c-89af79dbe7d5/tetris-practice",
      githubUrl: "#",
    },
    {
      title: "Physics Engine",
      shortDescription: "A portfolio website with background and clicking effects",
      detailedDescription: "A modern, interactive portfolio website featuring dynamic Three.js backgrounds and engaging click effects. Built with Next.js and React, this website showcases my projects and experiences with a beautiful, responsive design.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "tailwind CSS", "Three.js", "JavaScript"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      shortDescription: "A portfolio website with background and clicking effects",
      detailedDescription: "A modern, interactive portfolio website featuring dynamic Three.js backgrounds and engaging click effects. Built with Next.js and React, this website showcases my projects and experiences with a beautiful, responsive design.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "tailwind CSS", "Three.js", "JavaScript"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Color Palatte Genertor",
      shortDescription: "Generate color gradients from an anchoring color using an exponential algorithm",
      detailedDescription: "A Python application built with Tkinter that generates beautiful color palettes and gradients from a single anchoring color. Uses an exponential algorithm to create smooth color transitions. The color theme of this website was selected using this generator.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Python", "Tkinter"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Tabs Deleting Extension",
      shortDescription: "A Chrome extension for convenient tab management, published on Chrome Web Store",
      detailedDescription: "A Google Chrome extension that simplifies tab management by providing convenient tab deletion features. Published on the Chrome Web Store, this extension helps users efficiently manage their browser tabs with intuitive controls and keyboard shortcuts.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["HTML", "CSS", "JavaScript", "Chrome Development"],
      category: "Software",
      liveUrl: "https://chromewebstore.google.com/detail/tabcloser/ockefngjdpppnlhgkebeleakbinmlmec?authuser=0&hl=en-US",
      githubUrl: "#",
    },
  ]

   const filters = ["All", "Software", "Hardware", "Misc"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 1, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="h-full w-full py-20 overflow-y-auto hide-scrollbar">
      <div className="container mx-auto px-4 space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Projects</h2>
          <h3 className="text-xl md:text-2xl font-semibold text-amber-600">A showcase of my work and personal projects</h3>
          <p className="text-muted-foreground md:text-lg max-w-md mx-auto">
            Discover the creative solutions and innovative ideas I've brought to life.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter ? "gold-button" : "border-gray-200 hover:border-amber-300 hover:text-amber-600"
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card 
                className="overflow-hidden cursor-pointer border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 hover:border-amber-200"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-amber-600">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.shortDescription}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Dialog */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <DialogTitle className="text-2xl text-amber-600">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base pt-2">
                  {selectedProject.detailedDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                {selectedProject.githubUrl !== "#" && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-gray-200 hover:border-amber-300 hover:text-amber-600 w-full sm:w-auto"
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
                {selectedProject.liveUrl !== "#" && (
                  <Button
                    asChild
                    className="gold-button w-full sm:w-auto"
                  >
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Demo
                    </a>
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
