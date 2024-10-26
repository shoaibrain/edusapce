import { SchoolGeneralSettingsForm } from "@/components/forms/form-school-general-settings";
import { getSchool, getSchoolDepartments } from "@/services/service-school";
import { Metadata } from "next";
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SchoolDepartmentToggleForm } from "@/components/forms/form-department-toggle-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AcademicCalendarForm } from "@/components/forms/academic-calender-form";
import { SchedulingParametersForm } from "@/components/forms/form-school-days-times-params";
import { SchoolGradingConfigurationForm } from "@/components/forms/form-school-grading-config";
import { DeleteSchool } from "@/components/forms/form-delete-school";

export const metadata: Metadata = {
  title: "Settings",
  description: "School Settings Page",
}

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const school = await getSchool(decodeURIComponent(params.id))

  const existingDepartments = await getSchoolDepartments(params.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`General & Academic Settings for ${school?.name}`}
        text="Manage School academic and administrative settings"
      />
      <div className="grid gap-10">
        <Card className="overflow-hidden rounded-lg border border-blue-500">
            <CardHeader className="border-b border-blue-500 p-4">
              <CardTitle>School General Information</CardTitle>
            <CardDescription>Update school general information here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SchoolGeneralSettingsForm school={school} />
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-lg border border-blue-500">
          <CardHeader className="border-b border-blue-500 p-4">
                <CardTitle>School Academics Department</CardTitle>
              <CardDescription>Update school department information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h3 className="mb-2 text-lg font-semibold">Existing Departments</h3>
              <ul className="list-inside list-disc">
                  {existingDepartments.map((dept, index) => (
                    <li key={dept.id}>{dept.name}</li>
                  ))}
                </ul>
            </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
              <button
                className={cn(buttonVariants())}
              >
                <span>Edit Department</span>
              </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
                <DialogHeader>
                  <DialogTitle>Select your school departments</DialogTitle>
                </DialogHeader>
                <SchoolDepartmentToggleForm
                  schoolId={params.id}
                />
              </DialogContent>
            </Dialog>
        </div>
          </CardContent>
        </Card>
      </div>
  </DashboardShell>
  );
}
