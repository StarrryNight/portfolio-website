"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Experiences() {
  const experiences = [
    {
      title: "Exotic Filament Researcher",
      company: "UBC Rapid",
      period: "2024-2025",
      description: (
        <ul className="space-y-3 ">
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
      description: (
        <ul className="space-y-3 ">
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
      description: (
        <ul className="space-y-3 ">
          <li>
            {"\u2022"} Helped solved issues on the UBC Rapid website
          </li>
        </ul>
      ),
      skills: ["React", "Web dev"],
    },
    {
      title: "Java/Python Instructor",
      company: "CodingPals.org",
      period: "2021-2023",
      description: (
        <ul className="space-y-3 ">
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
  ];






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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="experience" className="py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 -z-10"></div>

      <div className="space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">Experience</h2>
          <p className="text-muted-foreground md:text-xl max-w-md mx-auto">
            My professional journey and the companies I've worked with.
          </p>
        </div>

        <motion.div
          className="space-y-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md hover:shadow-amber-100 transition-shadow duration-300 hover:border-amber-200">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-amber-600">{exp.title}</CardTitle>
                      <CardDescription>
                        {exp.company} | {exp.period}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-50 text-gray-800 border border-gray-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
