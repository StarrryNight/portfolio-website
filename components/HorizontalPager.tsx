"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface HorizontalPagerProps {
  children: React.ReactNode[]
  activeIndex: number
  onIndexChange?: (index: number) => void
}

export default function HorizontalPager({
  children,
  activeIndex,
  onIndexChange,
}: HorizontalPagerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(activeIndex)
  const containerRef = useRef<HTMLDivElement>(null)
  const minIndex = 0
  const maxIndex = children.length - 1

  // Sync with parent activeIndex
  useEffect(() => {
    if (!isDragging) {
      setCurrentIndex(activeIndex)
    }
  }, [activeIndex, isDragging])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false)
    const threshold = 50 // Minimum drag distance to trigger page change
    const velocity = info.velocity?.x || 0

    let newIndex = currentIndex

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 || velocity > 0) {
        // Swipe right - go to previous page
        newIndex = Math.max(minIndex, currentIndex - 1)
      } else {
        // Swipe left - go to next page
        newIndex = Math.min(maxIndex, currentIndex + 1)
      }
    }

    setCurrentIndex(newIndex)
    if (onIndexChange) {
      onIndexChange(newIndex)
    }
  }

  const dragConstraints = {
    left: -maxIndex * 100,
    right: 0,
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <motion.div
        className="flex h-full will-change-transform"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={{
          x: `-${currentIndex * 100}%`,
        }}
        style={{
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
          mass: 0.8,
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              touchAction: 'pan-y',
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
