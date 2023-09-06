import React from 'react'
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { getTotalAdmissions } from '@/services/admission-service'
import { Student, columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'


async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      status: "enrolled",
      email: "John@gmail.com ",
      classGrade:"JSS 1",
      feeOwed: 50000
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      status: "enrolled",
      email: "jane@example.com",
      classGrade: "SS 2",
      feeOwed: 60000
      },
      {
        id: "3",
        firstName: "Michael",
        lastName: "Johnson",
        gender: "Male",
        status: "enrolled",
        email: "michael@example.com",
        classGrade: "JSS 3",
        feeOwed: 55000
        },
        {
          id: "4",
          firstName: "Emily",
          lastName: "Williams",
          gender: "Female",
          status: "enrolled",
          email: "emily@example.com",
          classGrade: "SS 1",
          feeOwed: 62000
          },
          {
            id: "5",
            firstName: "David",
            lastName: "Brown",
            gender: "Male",
            status: "enrolled",
            email: "david@example.com",
            classGrade: "JSS 2",
            feeOwed: 59000
            },
            {
              id: "6",
              firstName: "Sophia",
              lastName: "Lee",
              gender: "Female",
              status: "enrolled",
              email: "sophia@example.com",
              classGrade: "SS 3",
              feeOwed: 64000
              },
              {
                id: "7",
                firstName: "Daniel",
                lastName: "Martin",
                gender: "Male",
                status: "enrolled",
                email: "daniel@example.com",
                classGrade: "JSS 1",
                feeOwed: 58000
                },
                {
                  id: "8",
                  firstName: "Olivia",
                  lastName: "Davis",
                  gender: "Female",
                  status: "enrolled",
                  email: "olivia@example.com",
                  classGrade: "SS 2",
                  feeOwed: 61000
                  },
                  {
                    id: "9",
                    firstName: "Taylor",
                    lastName: "Swift",
                    gender: "Female",
                    status: "graduated",
                    email: "taylor@example.com",
                    classGrade: "UKG",
                    feeOwed: 61000
                    },
                    {
                      id: "10",
                      firstName: "Olivia",
                      lastName: "Rudrige",
                      gender: "Female",
                      status: "transferred",
                      email: "olivia@example.com",
                      classGrade: "SS 2",
                      feeOwed: 61000
                      },
                      {
                        id: "11",
                        firstName: "Shoaib",
                        lastName: "Davis",
                        gender: "Male",
                        status: "enrolled",
                        email: "olivia@example.com",
                        classGrade: "SS 2",
                        feeOwed: 61000
                        },
                        {
                          id: "12",
                          firstName: "Saleena",
                          lastName: "Davis",
                          gender: "Female",
                          status: "enrolled",
                          email: "olivia@example.com",
                          classGrade: "SS 2",
                          feeOwed: 61000
                          },

  ]
}


export default async function StudentsPage() {
  const data = await getData();
  if (!data) {
    notFound()
  }

  const admissionRate = await getTotalAdmissions();

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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Academic Performance
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +06% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Alerts
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                 +9 new Alerts  
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
            <Link href="dashboard/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add Student
            </Link>
            </div>
            <div>
            <Link href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Pay School Fees
            </Link>
            </div>
            <div>
            <Link  href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Generate Transcript
            </Link>
            </div>
          </div>
          <div className="container mx-auto  py-10">
            <DataTable columns={columns} data={data} />
          </div>
    </>
  )
}
