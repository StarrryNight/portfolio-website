"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutMe() {
  const skills = [
    {
      category: "Web dev",
      items: [
        "React",
        "Next.js",
        "Reactflow",
        "Tailwind CSS",
        "CSS",
        "Node.js",
        "fastAPI",
        "REST API",
      ],
    },
    {
      category: "Machine Learning",
      items: ["Pytorch", "Sklearn", "Keras", "Opencv", "Tensorflow"],
    },
    {
      category: "Hardware",
      items: ["Circuitry", "3D printing", "Printer maintenence"],
    },
    {
      category: "Dev ops",
      items: ["Vercel", "Git", "CAD", "SOLIDWORKS", "Cura"],
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-5 -z-10"></div>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">About Me</h2>
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-lg">
                  I'm a <span className="text-amber-600 font-medium">Software Developer</span> with over 5 years of
                  experience building web applications. My journey in tech began when I built games on unity when I was 15, and I have been hooked ever since.
                </p>

                <p className="text-lg">
                  I am currently studying Engineering Physics at UBC. I am a part of student groups that specailizes in engineering designs,
                  where I have the chance to gain industrial experiences and work with clients.
                </p>

                <p className="text-lg">
                  I specialize in building{" "}
                  <span className="text-amber-600 font-medium">python software, app frontends, and deep learning projects</span> using
                  modern JavaScript frameworks. I'm passionate about clean code, user experience, and staying on top of
                  the latest web technologies.
                </p>

                <p className="text-lg">
                  When I'm not coding, you can find me playing music, playing soccer, or chilling with my friends.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Problem Solver
                </Badge>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Team Player
                </Badge>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Detail-Oriented
                </Badge>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Fast Learner
                </Badge>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                  Creative Thinker
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            ><Card className="bg-white/50 backdrop-blur-sm border-gray-200 overflow-hidden gold-border">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-amber-600">Skills & Expertise</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {skills.map((skillGroup) => (
                          <div key={skillGroup.category} className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground">{skillGroup.category}</h4>
                            <div className="flex flex-wrap gap-2">
                              {skillGroup.items.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-1 text-xs rounded-md bg-gray-50 border border-gray-200 text-gray-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-xl font-semibold text-amber-600 mb-4">Education</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">University of British Columbia</h4>
                          <p className="text-sm text-muted-foreground">BASC in Engineering Physics, 2024-Present</p>
                        </div>
                      </div>
                    </div>
                  </div>
              
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
