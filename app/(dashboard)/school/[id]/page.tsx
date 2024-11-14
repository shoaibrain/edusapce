import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { getSchoolOverviewData } from "@/lib/actions/school-actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/shell";

export const metadata: Metadata = {
  title: "School",
  description: "School Dashboard",
}
export default async function SchoolDashboard({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schoolOverview = await getSchoolOverviewData(params.id);
  return (
    <DashboardShell>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <Link href={`/school/${params.id}/students`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Students
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </CardHeader>
                  </Link>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${schoolOverview.schoolOverview?.student_count}`}</div>
                  </CardContent>
                </Card>
                <Card>
                <Link href={`/school/${params.id}/employees`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Employees
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </CardHeader>
                  </Link>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${schoolOverview.schoolOverview?.employee_count}`}</div>
                  </CardContent>
                </Card>
                <Card>
                <Link href={`/school/${params.id}/guardians`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Guardians</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </CardHeader>
                  </Link>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${schoolOverview.schoolOverview?.parent_count}`}</div>
                  </CardContent>
                </Card>
      </div>
    </DashboardShell>
  );
}
