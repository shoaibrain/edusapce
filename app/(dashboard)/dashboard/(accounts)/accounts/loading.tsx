import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardAccountsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Accounts"
        text="Manage Account & financial records"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
