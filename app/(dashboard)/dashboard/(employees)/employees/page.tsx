import React from 'react'
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
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
const URL = process.env.API_URL;

const getEmployees = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/employees`,{
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
  const employees = await getEmployees();
  if (!employees) {
    notFound()
  }

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
              Some Button
            </Link>
            </div>
          </div>
          <div className='container mx-auto py-10'>
          <DataTable columns={columns} data={employees} empolyee={true}/>
          </div>
    </>
  )
}
