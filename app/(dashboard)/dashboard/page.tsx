import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { te } from "date-fns/locale"
import { getSchoolsForTenant } from "@/services/service-tenant"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "eduSpace Dashboard",
}
const API_URL = process.env.API_URL;

export default async function DashboardPage() {
  const tenant = await getCurrentUser()
  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schools = await getSchoolsForTenant(tenant.id);

  return (
    <>
      <DashboardShell>
        <DashboardHeader
          text={`Welcome ${tenant.name}`}
        />
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">

              <h2 className="content-center text-3xl font-bold tracking-tight">
                  {
                    schools[0] ? (
                      schools[0].name
                    ) : (
                      'Something seems wrong, contact support.'
                    )
                  }
                  <div className="container ">
                    <Link
                      href="/school/register"
                      className={cn(buttonVariants({ size: "lg" }))}
                    >
                      Register School
                  </Link>
                  </div>
              </h2>
            </div>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
