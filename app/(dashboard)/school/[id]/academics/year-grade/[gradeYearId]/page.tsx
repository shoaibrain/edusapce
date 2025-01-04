import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getYearGradeLevel } from "@/services/service-academic"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ClassPeriodAddForm } from "@/components/forms/class-period-add"
import { DashboardShell } from "@/components/shell"
import { Clock, MapPin, Plus, Users } from "lucide-react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "School Year Grade",
  description: "Year Grade Level",
}

interface ClassPeriod {
  id: string
  name: string
  teacherCount: number
  studentCount: number
  schedule: string
  location: string
}

interface YearGradeLevel {
  id: string
  levelName: string
  description: string
  levelCategory: string
  levelOrder: number
  capacity: number
  studentCount: number
  classPeriods: ClassPeriod[]
}

export default async function YearGradePage({
  params
}: {
  params: {
    gradeYearId: string,
    id: string,
  }
}) {

  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const yearGradeLevelId = decodeURIComponent(params.gradeYearId)
  // get yearGradeLevels by ID
  const yearGradeLevel = await getYearGradeLevel(yearGradeLevelId);
  const schoolId = decodeURIComponent(params.id)

  const yearGrade = await getYearGradeLevel(yearGradeLevelId)
  console.log(yearGrade)
  if (yearGrade == null) {
    return (
      <p>
        Year grade level not found 🤔
      </p>
    )
  }
  return (
      < DashboardShell >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row-reverse">
          {/* Right Column - Grade Level Info */}
          <div className="w-full space-y-6 lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>{mockData.levelName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Description</h3>
                    <p>{mockData.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Category</h3>
                    <p className="capitalize">{mockData.levelCategory}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Level Order</h3>
                    <p>{mockData.levelOrder}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-muted-foreground">Total Capacity</h3>
                      <p>{mockData.capacity} students</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Current Students</h3>
                      <p>{mockData.studentCount} students</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Class Periods</h3>
                    <p className="text-2xl font-bold">{mockData.classPeriods.length}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Class Size</h3>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        mockData.classPeriods.reduce((acc, curr) => acc + curr.studentCount, 0) / mockData.classPeriods.length
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Teachers</h3>
                    <p className="text-2xl font-bold">
                      {mockData.classPeriods.reduce((acc, curr) => acc + curr.teacherCount, 0)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Capacity Utilization</h3>
                    <p className="text-2xl font-bold">
                      {Math.round((mockData.studentCount / mockData.capacity) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Left Column - Class Periods */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{mockData.levelName}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4 mb-4">
                  <div className="space-y-6">
                    {mockData.classPeriods.map((period) => (
                      <Link
                        key={period.id}
                        href={`/school/cm3gv6n8o00081020tkyjti5x/academics/year-grade/${mockData.id}/period/${period.id}`}
                      >
                        <Card className="py-4 transition-colors hover:bg-muted">
                          <CardHeader>
                            <CardTitle className="text-lg">{period.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {period.studentCount} Students
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {period.teacherCount} Teachers
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {period.schedule}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                {period.location}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Class Period
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] md:max-w-[60vw]">
                    <DialogHeader>
                      <DialogTitle>Add New Class Period</DialogTitle>
                      <DialogDescription>
                        Fill out the information for new class period. Click Save when done.
                      </DialogDescription>
                    </DialogHeader>
                    <ClassPeriodAddForm yearGradeLevelId={mockData.id} />
                  </DialogContent>
                </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </DashboardShell>
    )
}
