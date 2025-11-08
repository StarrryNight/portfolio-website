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
        className="flex h-full"
        animate={{
          x: `-${activeIndex * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
