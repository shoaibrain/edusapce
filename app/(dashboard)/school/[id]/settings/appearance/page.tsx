

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import prisma from "@/lib/db";


export default async function SchoolSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const school = await prisma.school.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <DashboardShell>
    <DashboardHeader
      heading="Settings"
      text="Manage account and website settings."
    />
    <div className="grid gap-10">
      <h3>School Appearance Form</h3>
    </div>
  </DashboardShell>
  );
}
