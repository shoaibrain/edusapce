import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { TenantPatchForm } from "@/components/tenant-patch-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const tenant = await getCurrentUser()

  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage tenant account settings"
      />
      <div className="grid gap-10">
        <TenantPatchForm tenant={
          { id: tenant.id,
            name: tenant.name || "",
            email: tenant.email || "",
          }} />
      </div>
    </DashboardShell>
  )
}
