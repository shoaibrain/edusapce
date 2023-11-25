import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "eduSpace Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <>
      <DashboardShell>
        <DashboardHeader
          text={`Welcome ${user.name}`}
        ></DashboardHeader>
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">

              <h2 className="text-3xl font-bold tracking-tight">
               Dashboard
              </h2>
            </div>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
