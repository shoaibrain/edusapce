import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/data-tables/data-table"
import { columns } from '@/components/data-tables/columns-school-data-table'
import { getSchoolsForTenant } from "@/services/service-tenant"

export const metadata = {
  title: "Settings | Manage School",
  description: "School settings.",
}

export default async function SchoolSettingsPage() {
  const tenant = await getCurrentUser()

  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schools = await getSchoolsForTenant(tenant.id);

  return (
    <DashboardShell>
      <div className="grid gap-10">
      <DataTable columns={columns} data={schools} school={true}/>
      </div>
    </DashboardShell>
  )
}
