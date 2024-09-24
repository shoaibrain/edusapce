import { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { ChevronRight, Users, Clock, Book, Plus, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getYearGradeLevel } from "@/services/service-academic"
import { getSchoolDepartments } from "@/services/service-school"

import { EditGradeDialog } from "@/components/forms/form-school-year-grade-level-edit"
import ClassPeriodCard from "@/components/class-period-card"
import { Progress } from "@/components/ui/progress"


export const metadata: Metadata = {
  title: "School Year Grade",
  description: "Year Grade Level",
}

export default async function YearGradePage({
  params
}: {
  params: {
    gradeYearId: string,
    id: string,
  }
}) {
  const gradeInfo = {
    name: "Second Grade",
    totalStudents: 120,
    classPeriods: 6,
    averageAttendance: 95,
    subjects: [
      { name: "Math", department: "Science" },
      { name: "English", department: "Humanities" },
      { name: "Science", department: "Science" },
      { name: "Art", department: "Arts" },
      { name: "Physical Education", department: "Health" },
      { name: "Music", department: "Arts" }
    ],
    instructors: [
      { name: "Ms. Johnson", subject: "Math" },
      { name: "Mr. Smith", subject: "English" },
      { name: "Dr. Brown", subject: "Science" },
      { name: "Mrs. Davis", subject: "Art" },
      { name: "Mr. Wilson", subject: "Physical Education" },
      { name: "Ms. Taylor", subject: "Music" }
    ]
  };

  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const yearGradeLevelId = decodeURIComponent(params.gradeYearId)
  const schoolId = decodeURIComponent(params.id)
  const yearGrade = await getYearGradeLevel(yearGradeLevelId)
  const existingDepartments = await getSchoolDepartments(schoolId)

  const classPeriods = yearGrade?.classPeriods;
  const studentCount = yearGrade?.studentCount;

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Link href={`/school/${schoolId}/academics`} className="hover:text-primary">Academics</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary font-medium">{yearGrade?.levelName}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Edit className="mr-2 size-4" />
                Edit Grade Level
              </Button>
            </DialogTrigger>
            <EditGradeDialog gradeInfo={gradeInfo} />
          </Dialog>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto px-6 py-8">
            <h1 className="mb-6 text-3xl font-semibold">{gradeInfo.name}</h1>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Class Periods</CardTitle>
                  <Clock className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classPeriods?.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  <Users className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{87}%</div>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
              <ClassPeriodCard
              classPeriods={classPeriods}
              existingDepartments={existingDepartments}
              yearGradeLevelId={yearGradeLevelId}
              />
              <div className="w-full md:w-1/3">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 size-4" /> Manage Students
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 size-4" /> Adjust Class Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Book className="mr-2 size-4" /> Curriculum Overview
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Instructors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {gradeInfo.instructors.map((instructor, index) => (
                        <li key={index} className="flex items-center">
                          <Users className="text-muted-foreground mr-2 size-4" />
                          <span>{instructor.name} ({instructor.subject})</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
