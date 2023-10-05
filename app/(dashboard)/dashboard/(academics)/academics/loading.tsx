import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardAcademicsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Academics"
        text="Manage school acedemics records."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
