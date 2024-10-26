"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AcademicCalendarForm() {
  const [yearStart, setYearStart] = useState('')
  const [yearEnd, setYearEnd] = useState('')
  const [termStructure, setTermStructure] = useState('semesters')
  const [customTerms, setCustomTerms] = useState([
    { name: 'Fall Semester', start: '', end: '' },
    { name: 'Spring Semester', start: '', end: '' }
  ])

  const handleCustomTermChange = (index: number, field: string, value: string) => {
    setCustomTerms(prev => prev.map((term, i) =>
      i === index ? { ...term, [field]: value } : term
    ))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year-start">Academic Year Start</Label>
          <Input
            id="year-start"
            type="date"
            value={yearStart}
            onChange={(e) => setYearStart(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year-end">Academic Year End</Label>
          <Input
            id="year-end"
            type="date"
            value={yearEnd}
            onChange={(e) => setYearEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="term-structure">Term Structure</Label>
        <Select value={termStructure} onValueChange={setTermStructure}>
          <SelectTrigger id="term-structure">
            <SelectValue placeholder="Select term structure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semesters">Semesters</SelectItem>
            <SelectItem value="trimesters">Trimesters</SelectItem>
            <SelectItem value="quarters">Quarters</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Custom Terms</Label>
        {customTerms.map((term, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Term name"
              value={term.name}
              onChange={(e) => handleCustomTermChange(index, 'name', e.target.value)}
            />
            <Input
              type="date"
              value={term.start}
              onChange={(e) => handleCustomTermChange(index, 'start', e.target.value)}
            />
            <Input
              type="date"
              value={term.end}
              onChange={(e) => handleCustomTermChange(index, 'end', e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button>Save Academic Calendar</Button>
    </div>
  )
}
