
//@ts-nocheck
import { SchoolAcademicSettingsForm } from "@/components/forms/form-school-academic-settings";
import { getSchoolAcademicDetails } from "@/lib/actions/school-actions";

import { getSchool } from "@/services/service-school";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "School Settings Page",
}

export default async function SchoolSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  // NOTE: As of now, classGrades are the only academic portfolio
  const school = await getSchool(decodeURIComponent(params.id))
  const schoolAcademics = await getSchoolAcademicDetails(decodeURIComponent(params.id))
  console.log(schoolAcademics)
  return (
    <div className="flex flex-col space-y-6">
     <SchoolAcademicSettingsForm academics={schoolAcademics} />
    </div>
  );
}
