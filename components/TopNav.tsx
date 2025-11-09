"use client"

import { motion } from "framer-motion"

interface Section {
  id: string
  label: string
}

interface TopNavProps {
  sections: Section[]
  activeSection: number
  onSectionChange: (index: number) => void
}

export default function TopNav({
  sections,
  activeSection,
  onSectionChange,
}: TopNavProps) {
  const handleSectionClick = (index: number) => {
    onSectionChange(index)
    // Scroll to section on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const element = document.getElementById(sections[index].id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <nav className="w-full flex justify-center">
      <div className="bg-white rounded-full px-2 md:px-6 py-2 md:py-3 shadow-lg border border-gray-200 flex items-center gap-1 md:gap-2 overflow-x-auto hide-scrollbar">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(index)}
            className="relative px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
          >
            {activeSection === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-amber-50 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span
              className={`relative z-10 text-xs md:text-base font-medium transition-colors ${
                activeSection === index
                  ? "text-amber-600"
                  : "text-gray-500"
              }`}
            >
              {section.label}
            </span>
            {activeSection === index && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
