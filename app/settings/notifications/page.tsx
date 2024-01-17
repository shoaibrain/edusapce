import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { TenantPatchForm } from "@/components/tenant-patch-form"
import TenantNotificationPreference from "@/components/tenant-notification-preference"

export const metadata = {
  title: "Settings | Email Preferences",
  description: "Emails and notifications settings.",
}

export default async function NotificationsPage() {
  const tenant = await getCurrentUser()

  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <div className="grid gap-10">
      <TenantNotificationPreference />
      </div>
    </DashboardShell>
  )
}
