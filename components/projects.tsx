"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = [
    {
      title: "Portfolio Website",
      description: "A portfolio website with background and clicking effects",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "tailwind CSS", "Three.js", "JavaScript"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Color Palatte Genertor",
      description: "Color palatte quicker to generate a gradient of colors by choosing an anchoring color. Uses an exponential algorithm. The theme of this website is selected by this generator",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Python", "Tkinter"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Tetris Practice Simulator",
      description: "A Unity Tetris Game that allows custom scenarios to be built. Used to practice techniques like T-spin etc. Used in a school club",
      image: "./tetris-thumbnail.png",
      tags: ["C#", "Unity"],
      category: "Software",
      liveUrl: "https://play.unity.com/en/games/574578bb-2258-40e1-ab7c-89af79dbe7d5/tetris-practice",
      githubUrl: "#",
    },
    {
      title: "Tabs Deleting Extension",
      description: "A google chrome extension that allows convenient tab deletion. Published on Chrome Webstore.",
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
    <section id="projects" className="h-full w-full py-20 overflow-y-auto">
      <div className="container mx-auto px-4 space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Projects</h2>
          <p className="text-muted-foreground md:text-xl max-w-md mx-auto">
            A showcase of my work and personal projects.
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
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden h-full flex flex-col border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 hover:border-amber-200">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image }
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-amber-600">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-50 text-gray-800 border border-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-gray-200 hover:border-amber-300 hover:text-amber-600"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="gold-button">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
