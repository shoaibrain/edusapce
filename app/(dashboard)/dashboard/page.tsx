import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const users = await prisma.user.findMany()
  console.log(user.id)
  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome ${user.name}. User ID: ${user.id}`}
        text="Manage resources and settings"
      ></DashboardHeader>
      <div>
        
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </DashboardShell>
  )
}
