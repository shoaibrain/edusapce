import React from 'react'
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { DataTableGuardian } from '@/components/data-table-guardians'
import prisma from '@/lib/db'
import {  columns } from '@/components/columns-guardian'
async function getGuardians() {
    try {
      const guardians =  await prisma.guardian.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
        },
      })
      return guardians;
    } catch (error) {
      console.error('Error fetching guardians:', error);
      throw error;
    }
  }
  

export default async function GuardiansPage() {// guardians aka parents
   const guardians = await getGuardians();
    if (!guardians) {
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
            <Link href="dashboard/guardians" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
                Human Resource
            </Link>
            </div>
            <div>
            <Link href="dashboard/guardians" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Human Resource
            </Link>
            </div>
            <div>
            <Link  href="dashboard/guardians" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Some Button
            </Link>
            </div>
          </div>
          {/* Guardians Table */}
          <div className='container mx-auto py-10'>
          <DataTableGuardian columns={columns} data={guardians} />
          </div>

    </>
  )
}
