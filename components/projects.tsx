"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [sortOption, setSortOption] = useState<"Default" | "Newest" | "Oldest">("Default")

  type Project = {
    title: string
    description: string
    image: string
    tags: string[]
    category: string
    liveUrl: string
    githubUrl: string
    date?: string // ISO date string, e.g., "2024-08-01"
  }

  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A portfolio website with background and clicking effects",
      image: "/port.png?height=400&width=600",
      tags: ["React", "tailwind CSS", "Three.js", "JavaScript"],
      category: "Software",
      liveUrl: "https://portfolio-website-jade-seven-38.vercel.app/",
      githubUrl: "https://github.com/StarrryNight/portfolio-website",
      date: "2025-07-22",
    },
    {
      title: "Neuromap",
      description:
        "An AI powered mindmapping webapp co-created with a friend from UCI",
      image: "./Neuromap.png?height=400&width=600",
      tags: [
        "React",
        "CSS",
        "TypeScript",
        "FastAPI",
        "Python backend",
        "OpenAI API",
      ],
      category: "Software",
      liveUrl: "https://www.neuromap.link",
      githubUrl: "#",
      date: "2025-08-22",
    },

    {
      title: "Tetris Practice Simulator",
      description:
        "A Unity Tetris Game that allows custom scenarios to be built. Used to practice techniques like T-spin etc. Used in a school club",
      image: "./tetris-thumbnail.png",
      tags: ["C#", "Unity"],
      category: "Software",
      liveUrl:
        "https://play.unity.com/en/games/574578bb-2258-40e1-ab7c-89af79dbe7d5/tetris-practice",
      githubUrl: "https://github.com/StarrryNight/UnityTetrisProject",
      date: "2023-04-20",
    },
    {
      title: "Physics Engine",
      description:
        "A physics engine that simulates the gravitationalmotion of planets in a 3D environment. Uses OpenGL for rendering and GLM for math. Includes camera control using keys.",
      image: "/phy_eng.png?height=400&width=600",
      tags: ["C++", "OpenGL", "Physics", "glm"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "https://github.com/StarrryNight/Physics_Engine",
      date: "2025-07-29",
    },
    {
      title: "Water Harvesting Simulation",
      description:
        "With a team of 6, created a simulation of water harvesting across different years for an indigenous community. Devlopoed an optimization algorithm to optimize stakeholder satisfaction.",
      image: "./Water-Harvesting.png?height=400&width=600",
      tags: ["Excel", "Visual Basic", "Optimization"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "#",
      date: "2025-04-04",
    },
    {
      title: "WebCam Holder",
      description:
        "With a team of 3, designed and 3D printed a holder for a web cam for the UBC Computer Science Department. The holder is designed to be able to hold the web cam in a stable position and also be able to rotate the web cam to the desired angle.",
      image: "/.png?height=400&width=600",
      tags: ["SOLIDWORKS", "3D Printing", "Consulting"],
      category: "Hardware",
      liveUrl: "#",
      githubUrl: "#",
      date: "2024-11-29",
    },
    {
      title: "Autonomous Claw",
      description:
        "An team-based  engineering project where we designed a claw to pick up and move objects. I worked on the CAD and some C coding",
      image: "./Claw.png?height=400&width=600",
      tags: ["C", "SOLIDWORKS", "Metal Cutting", "3D Prototyping"],
      category: "Hardware",
      liveUrl:
        "#",
      githubUrl: "#",
      date: "2025-02-28",
    },
    {
      title: "Color Palatte Genertor",
      description:
        "Color palatte quicker to generate a gradient of colors by choosing an anchoring color. Uses an exponential algorithm. The theme of this website is selected by this generator",
      image: "/color.png?height=400&width=600",
      tags: ["Python", "Tkinter"],
      category: "Software",
      liveUrl: "https://color-pallate-builder-website.vercel.app/",
      githubUrl: "https://github.com/StarrryNight/Color-pallete-picker",
      date: "2024-08-20",
    },
    {
      title: "F.U.R.I.N.A",
      description:
        "F.U.R.I.N.A stands for Fantastic Unreal Responsive Intelligent Networked Assistant. This project is a cross-platform desktop AI assistant application, featuring a modern Electron/React frontend and a Python FastAPI backend that streams AI-generated responses.",
      image: "/furina_icon.png?height=500&width=600",
      tags: ["HTML", "CSS", "JavaScript", "Chrome Development"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "https://github.com/StarrryNight/F.U.R.I.N.A",
      date: "2025-07-02",
    },
    {
      title: "Acne Detector",
      description:
        "Detects and classifies acne types in skin images using deep learning.",
      image: "/acne.png?height=400&width=600",
      tags: ["Deep learning", "AI", "Keras", "Scikit-learn"],
      category: "Software",
      liveUrl: "$",
      githubUrl: "https://github.com/StarrryNight/Acne",
      date: "2025-07-15",
    },
    {
      title: "Rage Detector",
      description:
        "A real-time emotion detection system designed to identify rage and anger in gaming contexts, particularly for reaction to bad randoms in Marvel Rivals and other competitive games.",
      image: "/rage_icon.jpg?height=400&width=600",
      tags: ["HTML", "CSS", "JavaScript", "Chrome Development"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "https://github.com/StarrryNight/Rage-Detector",
      date: "2025-07-11",
    },
    {
      title: "FPL Predictor",
      description:
        "There are two versions, one using pytorch and one using keras and sklearn. Uses FPL datasets to predict player perforamances after a week. ",
      image: "/fpl.png?height=400&width=600",
      tags: ["Pytorch", "Sklearn", "Keras"],
      category: "Software",
      liveUrl: "#",
      githubUrl: "https://github.com/StarrryNight/Pytorch-FPL",
      date: "2025-06-26",
    },

    {
      title: "Tabs Deleting Extension",
      description:
        "A google chrome extension that allows convenient tab deletion. Published on Chrome Webstore.",
      image: "/tabs.png?height=400&width=600",
      tags: ["HTML", "CSS", "JavaScript", "Chrome Development"],
      category: "Software",
      liveUrl:
        "https://chromewebstore.google.com/detail/tabcloser/ockefngjdpppnlhgkebeleakbinmlmec?authuser=0&hl=en-US",
      githubUrl: "https://github.com/StarrryNight/tabsCloser",
      date: "2022-03-28",
    },
  ];

   const filters = ["All", "Software", "Hardware", "Misc"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === "Default") return 0
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return sortOption === "Newest" ? bTime - aTime : aTime - bTime
  })

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
    <section id="projects" className="py-20">
      <div className="space-y-10">
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
          <Select value={sortOption} onValueChange={(val) => setSortOption(val as "Default" | "Newest" | "Oldest")}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Sort: Default</SelectItem>
              <SelectItem value="Newest">Sort: Newest</SelectItem>
              <SelectItem value="Oldest">Sort: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sortedProjects.map((project, index) => (
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
                  {project.date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(project.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
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
