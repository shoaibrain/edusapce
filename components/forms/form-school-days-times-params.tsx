"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SchedulingParametersForm() {
  const [schoolDayStart, setSchoolDayStart] = useState('08:00')
  const [schoolDayEnd, setSchoolDayEnd] = useState('15:00')
  const [periodDuration, setPeriodDuration] = useState(50)
  const [breakDuration, setBreakDuration] = useState(10)
  const [schoolDays, setSchoolDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  })

  const handleSchoolDayChange = (day: string) => {
    setSchoolDays(prev => ({ ...prev, [day]: !prev[day as keyof typeof prev] }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-day-start">School Day Start</Label>
          <Input
            id="school-day-start"
            type="time"
            value={schoolDayStart}
            onChange={(e) => setSchoolDayStart(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school-day-end">School Day End</Label>
          <Input
            id="school-day-end"
            type="time"
            value={schoolDayEnd}
            onChange={(e) => setSchoolDayEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="period-duration">Period Duration (minutes)</Label>
          <Input
            id="period-duration"
            type="number"
            value={periodDuration}
            onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="break-duration">Break Duration (minutes)</Label>
          <Input
            id="break-duration"
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>School Days</Label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(schoolDays).map(([day, isChecked]) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={`day-${day}`}
                checked={isChecked}
                onCheckedChange={() => handleSchoolDayChange(day)}
              />
              <Label htmlFor={`day-${day}`} className="capitalize">{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button>Save Scheduling Parameters</Button>
    </div>
  )
}
