
// @ts-nocheck
import { SchoolSettingsForm } from "@/components/forms/form-school-general-settings";
import { getSchool } from "@/services/service-school";
import { Metadata } from "next";

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
  return (
    <div className="flex flex-col space-y-6">
     <SchoolSettingsForm school={school} />
    </div>
  );
}
