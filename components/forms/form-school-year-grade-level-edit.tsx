'use client'
import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { YearGradeLevel } from '@prisma/client'


interface YearGradeEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  yearGrade: YearGradeLevel;
}

export function EditGradeDialog({ gradeInfo }) {
  const [name, setName] = useState(gradeInfo.name)
  const [totalStudents, setTotalStudents] = useState(gradeInfo.totalStudents)

  const handleSave = async () => {
    // Implement save logic here
    console.log('Saving:', { name, totalStudents })
  }

  return (
    <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
      <DialogHeader>
        <DialogTitle>Edit Grade Level</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="students" className="text-right">
            Total Students
          </Label>
          <Input
            id="students"
            type="number"
            value={totalStudents}
            onChange={(e) => setTotalStudents(Number(e.target.value))}
            className="col-span-3"
          />
        </div>
      </div>
      <Button onClick={handleSave}>Save changes</Button>
    </DialogContent>
  )
}
