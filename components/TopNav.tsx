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
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200 flex items-center gap-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className="relative px-4 py-2 rounded-full transition-colors"
          >
            {activeSection === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-amber-50 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span
              className={`relative z-10 font-medium transition-colors ${
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
