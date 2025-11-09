"use client"

import { useState, useEffect } from "react"
import TopNav from "@/components/TopNav"
import HorizontalPager from "@/components/HorizontalPager"
import { Introduction } from "@/components/introduction"
import { AboutMe } from "@/components/about-me"
import { Experiences } from "@/components/experiences"
import { Projects } from "@/components/projects"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    { id: "home", label: "Home", component: <Introduction onNavigateToProjects={() => setActiveSection(3)} /> },
    { id: "about", label: "About", component: <AboutMe /> },
    { id: "experience", label: "Experience", component: <Experiences /> },
    { id: "projects", label: "Projects", component: <Projects /> },
  ]


  // Prevent body scroll on mobile - sections should be viewport height only
  useEffect(() => {
    if (window.innerWidth >= 768) return // Only for mobile
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      {/* Desktop: Horizontal pager with fixed nav */}
      <main className="hidden md:block h-screen w-screen overflow-hidden bg-background" style={{ transform: 'translateZ(0)' }}>
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <TopNav
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        <HorizontalPager 
          activeIndex={activeSection}
          onIndexChange={setActiveSection}
        >
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="h-full w-full flex-shrink-0 overflow-y-auto hide-scrollbar"
              style={{
                transform: 'translateZ(0)',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
            >
              {section.component}
            </div>
          ))}
        </HorizontalPager>
      </main>

      {/* Mobile: Vertical stacking with nav as first section */}
      <main className="md:hidden w-screen h-screen bg-background overflow-hidden flex flex-col">
        {/* Navigation as first section - seamless with content */}
        <section className="w-full py-3 bg-white flex-shrink-0 z-50">
          <TopNav
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </section>

        {/* Sections - each takes remaining viewport height */}
        <div className="relative flex-1 overflow-hidden">
          {sections.map((section, index) => (
            <div 
              key={section.id} 
              id={section.id}
              className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                index === activeSection 
                  ? 'translate-x-0 z-10' 
                  : index < activeSection 
                  ? '-translate-x-full z-0' 
                  : 'translate-x-full z-0'
              }`}
            >
              {section.component}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
