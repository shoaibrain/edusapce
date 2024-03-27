import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmployeeHireForm } from "@/components/forms/form-employee-hire"


export const metadata: Metadata = {
  title: "Employee Register",
  description: "Register new Employee in school",
}

export default async function DashboardPage({
  params,
  }: {
    params: { id: string };
  }) {
  const tenant = await getCurrentUser()
  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  return (
    <>
     < EmployeeHireForm schoolId = {params.id} tenantId={tenant.id}/>
    </>
  )
}
