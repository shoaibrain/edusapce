import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function StudentSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Student Settings" text="Manage student settings">
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border"></div>
    </DashboardShell>
  )
}
