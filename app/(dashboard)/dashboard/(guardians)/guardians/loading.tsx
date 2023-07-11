import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardGuardiansLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Guardians"
        text="Manage guardian records"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
