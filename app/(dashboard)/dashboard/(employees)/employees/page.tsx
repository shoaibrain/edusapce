//@ts-nocheck
import React from 'react'
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Student, columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'

export const metadata: Metadata = {
  title: "Employees",
  description: "Employees Dashboard",
}
const URL = "https://project-eduspace.vercel.app/api/v1"

const getEmployees = async () => {
  try {
    const res = await fetch(`${URL}/employees`,{
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
export default async function EmployeesPage() {
  return (
    <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Widget
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                    short Description
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Widget
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                    short Description
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                 Widget
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                    short Description
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
            <Link href="/hire" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add New Employee
            </Link>
            </div>
          </div>
          {/* Employee Table */}
          <div className='container mx-auto py-10'>
          <DataTable columns={columns} data={[]} />
          </div>

    </>
  )
}
