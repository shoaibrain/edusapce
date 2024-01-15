import React from 'react'
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { columns } from '@/components/data-tables/columns-employee-data-table'

export const metadata: Metadata = {
  title: "Employees",
  description: "Employees Dashboard",
}
const API_URL = process.env.API_URL;

// TODO: get Employees for school, for tenant
const getEmployees = async (schoolId: string) => {
  try {
    const res = await fetch(`${API_URL}/employees`,{
      method : 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch employee data')
    }
    return res.json();
  } catch(error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
}
export default async function EmployeesPage(
  { params, }: { params: { id: string }; }
) {
  const schoolId = decodeURIComponent(params.id)
  const employees = await getEmployees(schoolId);
  if (!employees) {
    notFound()
  }

  return (
    <>
        <div className="container mx-auto  py-10">
          <div className="pb-8">
          <Link href={`/school/${schoolId}/register`} className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add New Employee
          </Link>
          </div>
          <DataTable columns={columns} data={employees} empolyee={true} />
        </div>
    </>
  )
}
