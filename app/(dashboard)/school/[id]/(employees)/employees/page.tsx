import React from 'react'
import Link from "next/link"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/data-tables/data-table'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { columns } from '@/components/data-tables/columns-employee-data-table'
import { getEmployeesForSchool } from '@/services/service-employee'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEmployeeMetricsForSchool } from '@/lib/actions/employee-action'
import { getCurrentUser } from '@/lib/session'
import { authOptions } from '@/lib/auth'


export const metadata: Metadata = {
  title: "Employees",
  description: "Employees Dashboard",
}
export default async function EmployeesPage(
  { params, }: { params: { id: string }; }
) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schoolId = decodeURIComponent(params.id)
  const employees = await getEmployeesForSchool(schoolId);
  const metrics = await getEmployeeMetricsForSchool(schoolId);
  if (!employees) {
    notFound()
  }

  return (
    <>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Tenure
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-range"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.employeeMetrics?.averageTenureYears} yrs`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Performance
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.employeeMetrics?.averagePerformanceRating}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-business"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.employeeMetrics?.retentionRate}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-heart"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/></svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${metrics.employeeMetrics?.employeeSatisfactionScore}`}</div>
                  </CardContent>
                </Card>
        </div>
        <div className="container mx-auto  py-10">
          <div className="pb-8">
          <Link href={`/school/${schoolId}/employee-registration`} className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add New Employee
          </Link>
          </div>
          <DataTable columns={columns} data={employees} empolyee={true} />
        </div>
    </>
  )
}
