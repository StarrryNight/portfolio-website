"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function Experiences() {
  const experiences = [
    {
      title: "Software Developer",
      company: "UBC Thunderbots",
      period: "2025-present",
      image: "/thunderbots.jpg",
      description: (
        <ul className="space-y-3">
          <li>
            {"\u2022"} Analyzed and enhanced enemy threat evaluation for defensive logic, designing and implementing additional unit tests and simulations that improved accurate threat blocking by 25%, optimizing decision-making for shots, passes, and ball carriers.
          </li>
          <li>
            {"\u2022"} Expanded ball placement test coverage by parametrizing scenarios from the 2023 RoboCup SSL technical challenge, eliminating redundant code while ensuring rigorous validation of all play cases.
          </li>
          <li>
            {"\u2022"} Refactored Thunderscope's icon handling by replacing custom SVG-based QIcon loaders with QtAwesome, streamlining the codebase and enhancing UI rendering efficiency by 20%
          </li>
        </ul>
      ),
      skills: ["Python", "C++", "Bazel", "Testing"],
    },
    {
      title: "Exotic Filament Researcher",
      company: "UBC Rapid",
      period: "2024-2025",
      image: "/materials.PNG",
      description: (
        <ul className="space-y-3">
          <li>
            {"\u2022"} Generated scientific reports on several exotic 3D
            printing filaments. Compiled findings of material properties,
            tensile test properties, and suggested optimal printing parameters
            for future use.
          </li>
          <li>
            {"\u2022"} Performed tensile tests on exotic materials in a student
            lab, including uniaxial tensile testing, 3-point bending tests etc.
          </li>
          <li>
            {"\u2022"} Adhered to ASTM standards (American Society for Testing
            and Materials) for scientific report generation.
          </li>
        </ul>
      ),
      skills: ["ASTM", "Lab Experience", "Researching", "Academic Writing"],
    },
    {
      title: "Modelling Team Member",
      company: "UBC Rapid",
      period: "2024-2025",
      image: "/camera.png",
      description: (
        <ul className="space-y-3">
          <li>
            {"\u2022"} Fulfilled printing and modeling requests from several UBC
            affiliated organizations.
          </li>
          <li>
            {"\u2022"} Assisted the UBC computer science department to produce
            40+ camera holders for monitoring purposes.
          </li>
          <li>
            {"\u2022"} Participated and communicated during meetings with
            clients.
          </li>
        </ul>
      ),
      skills: ["CAD", "SOLIDWORKS", "3D-Printing"],
    },
    {
      title: "Web design member",
      company: "UBC Rapid",
      period: "2024",
      image: "/webdev.png",
      description: (
        <ul className="space-y-3">
          <li>
            {"\u2022"} Helped resolving issues on the UBC Rapid website.
          </li>
        </ul>
      ),
      skills: ["React", "Web dev"],
    },
    {
      title: "Java/Python Lead Instructor",
      company: "CodingPals.org",
      period: "2021-2023",
      image: "/codingpal.png",
      description: (
        <ul className="space-y-3">
          <li>
            {"\u2022"} Taught over 50 high school students programming, level
            ranging from introduction to competitive
          </li>
          <li>
            {"\u2022"} Was commended as one of the best instructors near the end
            of the term, actively improving the curriculum and providing genuine
            support.
          </li>
        </ul>
      ),
      skills: ["Python", "Java", "Competitive Programming", "Communication"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="experience" className="h-full w-full py-20 relative overflow-y-auto hide-scrollbar">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 -z-10"></div>

      <div className="container mx-auto px-4 space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Experience</h2>
          <h3 className="text-xl md:text-2xl font-semibold text-amber-600">My professional journey and the companies I've worked with</h3>
          <p className="text-muted-foreground md:text-lg max-w-md mx-auto">
            Explore my work history and the valuable experiences I've gained along the way.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300 transform md:-translate-x-1/2"></div>

          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="relative"
                >
                  <div className="flex items-start gap-6 md:gap-8">
                    {/* Timeline node - centered for desktop */}
                    <div className="relative z-10 flex-shrink-0 md:order-2">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white border-4 border-amber-500 shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-500"></div>
                      </div>
                    </div>

                    {/* Content card - left side for even, right side for odd */}
                    <div className={`flex-1 ${isEven ? "md:order-1 md:pr-8" : "md:order-3 md:pl-8"}`}>
                      <motion.div
                        className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        {/* Period badge */}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
                            {exp.period}
                          </span>
                        </div>

                        {/* Title and Company */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-amber-600 mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-gray-600 font-medium">{exp.company}</p>
                        </div>

                        {/* Description */}
                        <div className="text-gray-700 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Image - opposite side of content */}
                    <div className={`hidden md:flex flex-1 items-center justify-center ${isEven ? "md:order-3 md:pl-8" : "md:order-1 md:pr-8"}`}>
                      <motion.div
                        className="w-full max-w-xs h-64 rounded-lg overflow-hidden shadow-lg border border-amber-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={exp.image}
                          alt={`${exp.company} - ${exp.title}`}
                          width={400}
                          height={256}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
