
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { Metadata } from 'next'
import { StudentAdmissionForm } from '@/components/form-student-admit'

export const metadata: Metadata = {
  title: "Students",
  description: "Students Dashboard",
}
const URL = "https://project-eduspace.vercel.app/api"
async function getStudents() {
  try {
    const res = await fetch(`${URL}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch student data')
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

export default async function StudentsPage() {
  const students = await getStudents();
  if (!students) {
    notFound()
  }
  const admissionRate = students.length;

  return (
    <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Admissions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {`${admissionRate} new admissions`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendence Rate
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

          </div>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
            <Link href="/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add Student
            </Link>
            </div>
          </div>
          <div className="container mx-auto  py-10">
            <DataTable columns={columns} data={students} />
          </div>
    </>
  )
}
