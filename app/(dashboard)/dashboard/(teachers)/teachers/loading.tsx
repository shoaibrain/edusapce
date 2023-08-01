import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardTeachersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Teachers"
        text="Manage teacher records."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
