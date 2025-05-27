"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface ThreeControlsProps {
  onFrequencyChange: (value: number) => void
  onRangeChange: (value: number) => void
  onClose: () => void
}

export function ThreeControls({ onFrequencyChange, onRangeChange, onClose }: ThreeControlsProps) {
  const [frequency, setFrequency] = useState(50)
  const [range, setRange] = useState(5)

  const handleFrequencyChange = (value: number[]) => {
    setFrequency(value[0])
    onFrequencyChange(value[0])
  }

  const handleRangeChange = (value: number[]) => {
    setRange(value[0])
    onRangeChange(value[0])
  }

  return (
    <Card className="w-64 absolute top-20 right-4 z-50 bg-card/90 backdrop-blur-md border-blue-900/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm text-blue-400">Background Controls</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-blue-400">
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Frequency</span>
            <span className="text-xs text-blue-400">{frequency}</span>
          </div>
          <Slider
            defaultValue={[50]}
            max={150}
            step={1}
            onValueChange={handleFrequencyChange}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Range</span>
            <span className="text-xs text-blue-400">{range}</span>
          </div>
          <Slider defaultValue={[5]} max={15} step={0.5} onValueChange={handleRangeChange} className="cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}
