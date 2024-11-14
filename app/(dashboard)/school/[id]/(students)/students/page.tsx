import React from 'react'
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/data-tables/columns-student-data-table'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'
import { getStudentsForSchool, getStudentsForSchoolOld } from '@/services/service-student'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchoolStudentOverviewData } from '@/lib/actions/school-actions'
import { getCurrentUser } from '@/lib/session'
import { authOptions } from '@/lib/auth'
import { DashboardShell } from '@/components/shell'

export const metadata: Metadata = {
  title: "Students",
  description: "Students Dashboard",
}


export default async function StudentsPage({
  params,}: {params: { id: string };
  }) {
    const user = await getCurrentUser()
    if (!user) {
      redirect(authOptions?.pages?.signIn || "/login")
    }

    const schoolId = decodeURIComponent(params.id);
    const students = await getStudentsForSchool(schoolId);
      if (!students) {
        console.log(`No students found`)
        notFound()
      }
    const metrics  = await getSchoolStudentOverviewData(schoolId);

  return (
    <DashboardShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendence Rate
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.studentMetrics?.averageAttendanceRate}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Graduation Rate
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.studentMetrics?.graduationRate}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clubs Participation</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-club"><path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"/><path d="M12 17.66L12 22"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.studentMetrics?.clubsParticipationRate}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Suspension Rate</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-x"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.studentMetrics?.suspensionRate}`}</div>
                  </CardContent>
                </Card>
        </div>
        <div className="container mx-auto  py-10">
        <div className="pb-8">
          <Link href={`/school/${schoolId}/student-admission`} className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Admit New Student
          </Link>
          </div>
          <DataTable columns={columns} data={students} student={true} />
        </div>
    </DashboardShell>
  )
}
