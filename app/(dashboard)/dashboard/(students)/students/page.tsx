
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'

async function getStudents() {
  const URL = 'https://project-eduspace.vercel.app/';
  try {
    const res = await fetch(`${URL}/api/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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

// Simulate a database read for tasks.
async function getTasks() {
  return [
    {
      "firstName": "John",
      "lastName": "Doe",
      "birthDate": "34567",
      "gender": "Male",
      "email": "johndoe@example.com",
      "enrollmentStatus": "Admitted",
      "currentGrade": "ONE"
    },
    {
      "firstName": "Alice",
      "lastName": "Smith",
      "birthDate": "45678",
      "gender": "Female",
      "email": "alicesmith@example.com",
      "enrollmentStatus": "Enrolled",
      "currentGrade": "TWO"
    },
    {
      "firstName": "Bob",
      "lastName": "Johnson",
      "birthDate": "56789",
      "gender": "Male",
      "email": "bobjohnson@example.com",
      "enrollmentStatus": "Transferred",
      "currentGrade": "THREE"
    },
    {
      "firstName": "Eva",
      "lastName": "Brown",
      "birthDate": "67890",
      "gender": "Female",
      "email": "evabrown@example.com",
      "enrollmentStatus": "Graduated",
      "currentGrade": "FOUR"
    },
    {
      "firstName": "Michael",
      "lastName": "Williams",
      "birthDate": "78901",
      "gender": "Male",
      "email": "michaelwilliams@example.com",
      "enrollmentStatus": "Dropped",
      "currentGrade": "FIVE"
    },
    {
      "firstName": "Sophia",
      "lastName": "Davis",
      "birthDate": "89012",
      "gender": "Female",
      "email": "sophiadavis@example.com",
      "enrollmentStatus": "Admitted",
      "currentGrade": "SIX"
    },
    {
      "firstName": "David",
      "lastName": "Lee",
      "birthDate": "90123",
      "gender": "Male",
      "email": "davidlee@example.com",
      "enrollmentStatus": "Enrolled",
      "currentGrade": "SEVEN"
    },
    {
      "firstName": "Olivia",
      "lastName": "Clark",
      "birthDate": "12345",
      "gender": "Female",
      "email": "oliviaclark@example.com",
      "enrollmentStatus": "Transferred",
      "currentGrade": "EIGHT"
    },
    {
      "firstName": "Liam",
      "lastName": "Anderson",
      "birthDate": "23456",
      "gender": "Male",
      "email": "liamanderson@example.com",
      "enrollmentStatus": "Graduated",
      "currentGrade": "NINE"
    },
    {
      "firstName": "Emma",
      "lastName": "Martinez",
      "birthDate": "34567",
      "gender": "Female",
      "email": "emmartinez@example.com",
      "enrollmentStatus": "Dropped",
      "currentGrade": "TEN"
    },
    {
      "firstName": "Noah",
      "lastName": "Harris",
      "birthDate": "45678",
      "gender": "Male",
      "email": "noahharris@example.com",
      "enrollmentStatus": "Admitted",
      "currentGrade": "ONE"
    },
    {
      "firstName": "Ava",
      "lastName": "Wilson",
      "birthDate": "56789",
      "gender": "Female",
      "email": "avawilson@example.com",
      "enrollmentStatus": "Enrolled",
      "currentGrade": "TWO"
    },
    {
      "firstName": "William",
      "lastName": "White",
      "birthDate": "67890",
      "gender": "Male",
      "email": "williamwhite@example.com",
      "enrollmentStatus": "Transferred",
      "currentGrade": "THREE"
    },
    {
      "firstName": "Mia",
      "lastName": "Turner",
      "birthDate": "78901",
      "gender": "Female",
      "email": "miaturner@example.com",
      "enrollmentStatus": "Graduated",
      "currentGrade": "FOUR"
    },
    {
      "firstName": "James",
      "lastName": "Moore",
      "birthDate": "89012",
      "gender": "Male",
      "email": "jamesmoore@example.com",
      "enrollmentStatus": "Dropped",
      "currentGrade": "FIVE"
    }
  ]
  
  
}

export default async function StudentsPage() {
  // const students = await getStudents();

  const tasks = await getTasks()
  if (!tasks) {
    notFound()
  }

  const admissionRate = tasks.length;

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
            <DataTable columns={columns} data={tasks} />
          </div>
    </>
  )
}
