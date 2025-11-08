"use client"

import { useState, useEffect } from "react"
import TopNav from "@/components/TopNav"
import HorizontalPager from "@/components/HorizontalPager"
import { Introduction } from "@/components/introduction"
import { AboutMe } from "@/components/about-me"
import { Experiences } from "@/components/experiences"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    { id: "home", label: "Home", component: <Introduction /> },
    { id: "about", label: "About", component: <AboutMe /> },
    { id: "experience", label: "Experience", component: <Experiences /> },
    { id: "projects", label: "Projects", component: <Projects /> },
    { id: "contact", label: "Contact", component: <Contact /> },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveSection((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        setActiveSection((prev) => Math.min(sections.length - 1, prev + 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sections.length])

  return (
    <main className="h-screen w-screen overflow-hidden bg-background" style={{ transform: 'translateZ(0)' }}>
      <TopNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <HorizontalPager activeIndex={activeSection}>
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="h-full w-full flex-shrink-0 overflow-y-auto hide-scrollbar"
            style={{
              transform: 'translateZ(0)',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {section.component}
          </div>
        ))}
      </HorizontalPager>
    </main>
  )
}
