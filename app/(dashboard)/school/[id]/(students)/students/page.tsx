
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/data-tables/columns-student-data-table'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Students",
  description: "Students Dashboard",
}

const API_URL ="http://localhost:3000/api/v1";

async function getStudents(schoolId: string) {
  try {
    // get students for this school
    const res = await fetch(`${API_URL}/schools/${schoolId}/?nextResource=student`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
    });
    if (!res.ok) {
      console.log(`Error fetching students: ${res.status}`)
      throw new Error('Failed to fetch student data')
    }
    return res.json();
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
