import { SchoolDepartmentToggleForm } from "@/components/forms/form-department-toggle-group";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { getGradeLevelsForSchool, getSchool, getSchoolDepartments } from "@/services/service-school";
import { DepartmentEnum } from "@/types/department";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "School Settings Page",
}

export default async function SchoolSettings({
  params,
}: {
  params: { id: string };
}) {
  const schoolId = decodeURIComponent(params.id);
  const schoolGradeLevels = await getGradeLevelsForSchool(schoolId);
  const existingDepartments = await getSchoolDepartments(schoolId);
  const mappedDepartments = existingDepartments
                            .map((dept) => DepartmentEnum[dept.name as keyof typeof DepartmentEnum])
                            .filter(Boolean);

  return (
    <>
    <div className="flex flex-col space-y-2">
       <h3 className="mb-2 text-lg font-semibold">Existing Departments</h3>
      <ul className="list-inside list-disc">
          {existingDepartments.map((dept) => (
            <li key={dept.id}>{dept.name}</li>
          ))}
        </ul>
    </div>

    <div>
        <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Departments</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
                  <DialogHeader>
                    <DialogTitle>Select your school departments</DialogTitle>
                  </DialogHeader>
                  <SchoolDepartmentToggleForm
                    schoolId={schoolId}
                    existingDepartments={mappedDepartments}
                  />
                </DialogContent>
        </Dialog>
        </div>

    </>
  );
}
