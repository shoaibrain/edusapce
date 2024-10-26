import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { TenantUpdateForm } from "@/components/forms/tenant-update-form"
import { Metadata } from "next"
import { getTenant } from "@/lib/actions/tenant-actions"

export const metadata: Metadata = {
  title: "Tenant Settings",
  description: "Tenant Admin Settings page",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const tenant = await getTenant(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage tenant account settings"
      />
      <div className="grid gap-10">
        <TenantUpdateForm tenant={tenant.data}/>
      </div>
    </DashboardShell>
  )
}
