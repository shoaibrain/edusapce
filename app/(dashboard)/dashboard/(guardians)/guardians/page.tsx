import React from 'react'
import { notFound, redirect } from "next/navigation"

import prisma from "@/lib/db"
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

async function getGuardians() {
  // Fetch all guardians
  return await prisma.guardian.findMany({
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

export default async function GuardiansPage() {
  const guardians = await getGuardians()

  if (!guardians) {
    notFound()
  }

  return (
    <>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
              <Link href="dashboard/students/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
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
              {guardians.map((guardian) => (
                <tr key={guardian.id}>
                  <Link href={`/dashboard/guardians/${guardian.id}`}>
                  <td>{guardian.id}</td>
                  </Link>
                  <td>{guardian.firstName}</td>
                  <td>{guardian.lastName}</td>
                  <td>{guardian.email}</td>
                  <td>{guardian.phone}</td>
                  <td>{guardian.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </>
  )
}
