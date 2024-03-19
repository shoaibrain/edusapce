
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/data-tables/columns-student-data-table'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'
import { getStudentsForSchool } from '@/services/service-student'

export const metadata: Metadata = {
  title: "Students",
  description: "Students Dashboard",
}

async function getStudents(schoolId: string) {
  try {
    const students = await getStudentsForSchool(schoolId)
    if (!students) {
      throw new Error(`Failed to get student data for school: ${schoolId}`)
    }
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

export default async function StudentsPage({
  params,
  }: {
    params: { id: string };
  }) {
  const schoolId = decodeURIComponent(params.id)

  const students = await getStudents(schoolId);
  if (!students) {
    console.log(`No students found`)
    notFound()
  }
  console.log(`Students:${JSON.stringify(students)}`)

  return (
    <>
        <div className="container mx-auto  py-10">
          <div className="pb-8">
          <Link href={`/school/${schoolId}/admission`} className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Admit New Student
          </Link>
          </div>
          <DataTable columns={columns} data={students} student={true} />
        </div>
    </>
  )
}
