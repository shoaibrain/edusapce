import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { EmployeeProfileEditForm } from "@/components/forms/form-employee-edit"
import { EmployeeAdministrativeEditForm } from "@/components/forms/form-employee-administrative-edit"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEmployee } from "@/services/service-employee"

export const metadata: Metadata = {
  title: "Employee Settings",
  description: "Manage employee profile and administrative settings",
}

export default async function EmployeeSettingsPage({ params }: { params: { id: string, employeeId: string } }) {
  const schoolId = params.id
  const employeeId = params.employeeId
  const employee = await getEmployee(employeeId);
  console.log(JSON.stringify(employee))

  return (
    <DashboardShell>
        <DashboardHeader
        heading={`Settings for ${employee.firstName} ${employee.lastName}`}
        text="manage employee profile & settings."
      />
      <div className="grid gap-10">
        <Card className="overflow-hidden rounded-lg border border-blue-500">
        <CardHeader className="border-b border-blue-500 p-4">
              <CardTitle>School General Information</CardTitle>
            <CardDescription>Update school general information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <EmployeeProfileEditForm employee={employee} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-lg border border-blue-500">
        <CardHeader className="border-b border-blue-500 p-4">
              <CardTitle>School General Information</CardTitle>
            <CardDescription>Update school general information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
          <EmployeeAdministrativeEditForm schoolId={schoolId} employeeId={employeeId} />
          </CardContent>
        </Card>
      </div>

    </DashboardShell>
  )
}
