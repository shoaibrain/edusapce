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

import { RecentSales } from "@/components/recent";
import { SchoolEarningOverview } from "@/components/overview-school-earning";
import { getSchoolOverviewData } from "@/lib/actions/school-actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

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
    <>
      <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/" >Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>School</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
      </Breadcrumb>
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>block-1</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <p>block-1</p>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>block-2</CardTitle>
                    <CardDescription>
                      block-desc
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    block-2
                  </CardContent>
                </Card>
              </div>
    </>
  );
}
