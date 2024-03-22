

// @ts-nocheck
import { SchoolAcademicSettingsForm } from "@/components/forms/form-school-academic-settings";
import { SchoolAppearanceSettingsForm } from "@/components/forms/form-school-appearance-settings";
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
  const school = await getSchool(decodeURIComponent(params.id))
  return (
    <div className="flex flex-col space-y-6">
     <SchoolAcademicSettingsForm school={school} />
    </div>
  );
}
