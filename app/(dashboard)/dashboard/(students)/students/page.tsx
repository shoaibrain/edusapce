import React from 'react'
import { notFound, redirect } from "next/navigation"
import { Student, User } from "@prisma/client"

import prisma from "@/lib/db"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, Gauge, Users, AlertTriangle } from 'lucide-react'
import { Search } from '@/components/search'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

async function getStudents() {
  // Fetch all students
  return await prisma.student.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    },
  })
}

export default async function StudentsPage() {
  const students = await getStudents()

  if (!students) {
    notFound()
  }

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
                  +12.1% from last month
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
                <CreditCard className="h-4 w-4 text-muted-foreground" />
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
            {/* <div>
              <Search />
            </div> */}
            <div>
              <Link href="dashboard/students/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add Student
            </Link>
            </div>
            <div>
            <Link href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Pay Tuition Bill
            </Link>
            </div>
            <div>
            <Link href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Generate Transcript
            </Link>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <Link href={`/dashboard/students/${student.id}`}>
                  <td>{student.id}</td>
                  </Link>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </>
  )
}
