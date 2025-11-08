"use client"

import { motion } from "framer-motion"

interface HorizontalPagerProps {
  children: React.ReactNode[]
  activeIndex: number
}

export default function HorizontalPager({
  children,
  activeIndex,
}: HorizontalPagerProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="flex h-full will-change-transform"
        animate={{
          x: `-${activeIndex * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
          mass: 0.8,
        }}
        style={{
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
