import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "eduSpace Dashboard",
}

export default async function DashboardPage() {

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const hasSchoolRegistered = () => {
    return !!user.schoolId;
  };

  return (
    <>
      <DashboardShell>
        <DashboardHeader
          text={`Welcome ${user.name}`}
        />
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">

              <h2 className="content-center text-3xl font-bold tracking-tight">
              {hasSchoolRegistered() ? (
                  `School ID: ${user.schoolId}`
                ) : (
                  <div className="container ">
                    <p className="py-4 text-sm font-medium">
                      You do not have school registered yet.
                    </p>
                    <Link
                      href="/school/register"
                      className={cn(buttonVariants({ size: "lg" }))}
                    >
                      Register School
                  </Link>
                  </div>
                )}
              </h2>
            </div>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
