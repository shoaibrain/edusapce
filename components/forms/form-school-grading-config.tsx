"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Slider } from '../ui/slider'

type GradeScale = 'letter' | 'numeric' | 'percentage'

interface GradeConfig {
  name: string
  minScore: number
  gpa: number
}

const defaultGradeConfigs: Record<GradeScale, GradeConfig[]> = {
  letter: [
    { name: 'A', minScore: 90, gpa: 4.0 },
    { name: 'B', minScore: 80, gpa: 3.0 },
    { name: 'C', minScore: 70, gpa: 2.0 },
    { name: 'D', minScore: 60, gpa: 1.0 },
    { name: 'F', minScore: 0, gpa: 0.0 },
  ],
  numeric: [
    { name: '7', minScore: 90, gpa: 4.0 },
    { name: '6', minScore: 80, gpa: 3.5 },
    { name: '5', minScore: 70, gpa: 3.0 },
    { name: '4', minScore: 60, gpa: 2.5 },
    { name: '3', minScore: 50, gpa: 2.0 },
    { name: '2', minScore: 40, gpa: 1.5 },
    { name: '1', minScore: 30, gpa: 1.0 },
  ],
  percentage: [
    { name: '90-100%', minScore: 90, gpa: 4.0 },
    { name: '80-89%', minScore: 80, gpa: 3.5 },
    { name: '70-79%', minScore: 70, gpa: 3.0 },
    { name: '60-69%', minScore: 60, gpa: 2.5 },
    { name: '50-59%', minScore: 50, gpa: 2.0 },
    { name: '0-49%', minScore: 0, gpa: 0.0 },
  ],
}

export function SchoolGradingConfigurationForm() {
  const [gradeScale, setGradeScale] = useState<GradeScale>('letter')
  const [gradeConfigs, setGradeConfigs] = useState<GradeConfig[]>(defaultGradeConfigs.letter)
  const [useWeightedGPA, setUseWeightedGPA] = useState(false)
  const [maxGPA, setMaxGPA] = useState(4.0)
  const [scaleName, setScaleName] = useState('Default Scale')

  const handleGradeScaleChange = (value: GradeScale) => {
    setGradeScale(value)
    setGradeConfigs(defaultGradeConfigs[value])
  }

  const handleGradeConfigChange = (index: number, field: keyof GradeConfig, value: number | string) => {
    setGradeConfigs(prev => prev.map((config, i) => {
      if (i === index) {
        let updatedValue = value
        if (field === 'minScore') {
          updatedValue = Math.max(0, Math.min(100, Number(value)))
        } else if (field === 'gpa') {
          updatedValue = Math.max(0, Number(value))
        }
        return { ...config, [field]: updatedValue }
      }
      return config
    }))
  }

  const addGradeConfig = () => {
    setGradeConfigs(prev => [...prev, { name: '', minScore: 0, gpa: 0 }])
  }

  const removeGradeConfig = (index: number) => {
    setGradeConfigs(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = () => {
    const formData = {
      name: scaleName,
      scale: gradeScale,
      useWeightedGPA,
      maxGPA,
      gradeConfigs,
    }

    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Card >
      <CardContent className="space-y-6">
        <div className="space-y-2 m-2">
          <Label htmlFor="scale-name">Scale Name</Label>
          <Input
            id="scale-name"
            value={scaleName}
            onChange={(e) => setScaleName(e.target.value)}
            placeholder="Enter a name for this grading scale"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade-scale">Grading Scale</Label>
          <Select value={gradeScale} onValueChange={handleGradeScaleChange}>
            <SelectTrigger id="grade-scale">
              <SelectValue placeholder="Select grading scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
              <SelectItem value="numeric">Numeric Grades (1-7)</SelectItem>
              <SelectItem value="percentage">Percentage Grades</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Grade Configuration</Label>
          {gradeConfigs.map((config, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`grade-${index}`}>Grade</Label>
                    <Input
                      id={`grade-${index}`}
                      value={config.name}
                      onChange={(e) => handleGradeConfigChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`min-score-${index}`}>Minimum Score</Label>
                    <Input
                      id={`min-score-${index}`}
                      type="number"
                      value={config.minScore}
                      onChange={(e) => handleGradeConfigChange(index, 'minScore', Number(e.target.value))}
                      min={0}
                      max={gradeScale === 'numeric' ? 100 : undefined}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${index}`}>GPA Value</Label>
                    <Input
                      id={`gpa-${index}`}
                      type="number"
                      step="0.1"
                      value={config.gpa}
                      onChange={(e) => handleGradeConfigChange(index, 'gpa', Number(e.target.value))}
                      min={0}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="destructive"
                      onClick={() => removeGradeConfig(index)}
                      disabled={gradeConfigs.length <= 1}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove grade</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addGradeConfig} variant="outline" className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Grade
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="weighted-gpa">Use Weighted GPA</Label>
            <Switch
              id="weighted-gpa"
              checked={useWeightedGPA}
              onCheckedChange={setUseWeightedGPA}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Weighted GPA takes into account the difficulty of courses.
          </p>
        </div>

        {useWeightedGPA && (
          <div className="space-y-2">
            <Label htmlFor="max-gpa">Maximum GPA</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="max-gpa"
                min={4.0}
                max={5.0}
                step={0.1}
                value={[maxGPA]}
                onValueChange={([value]) => setMaxGPA(value)}
              />
              <span className="font-medium">{maxGPA.toFixed(1)}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>Save Grading System</Button>
      </CardFooter>
    </Card>
  )
}
