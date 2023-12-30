
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/data-tables/columns-student-data-table'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Students",
  description: "Students Dashboard",
}

const API_URL = process.env.API_URL;
// TODO: getStudent for School, for tenant
async function getStudents() {
  try {
    // TODO: why can't I use /foos to get all foos?
    const res = await fetch(`${API_URL}/students`, {
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

          </div>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
            <Link href="/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Admit New Student
            </Link>
            </div>
          </div>
          <div className="container mx-auto  py-10">
            <DataTable columns={columns} data={students} student={true} />
          </div>
    </>
  )
}
