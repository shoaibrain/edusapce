import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import { Suspense } from "react"

import SchoolCard from "@/components/school-card"
import Image from 'next/image'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getTenantSchools } from "@/lib/actions/tenant-actions"
import { DashboardShell } from "@/components/shell"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "eduSpace Dashboard",
}

export default async function DashboardPage() {
  const tenant = await getCurrentUser()
  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schools = await getTenantSchools(tenant.id);
  console.log(`logged in user role: ${tenant.role}`)

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Your Schools
          </h1>
          <Link href="/school/register" className={cn(buttonVariants({ size: "lg" }))}>
              Register School
          </Link>
        </div>
        <Suspense
          fallback={
            null
          }
        >
            {schools && schools.data && schools.data.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {schools.data.map((school) => (
                  <SchoolCard key={school.id} data={school} />
                ))}
              </div>
            ): (
              <div className="mt-20 flex flex-col items-center space-x-4">
                <h1 className="font-cal text-4xl">No School found</h1>
                <Image
                  alt="missing school"
                  src="https://illustrations.popsy.co/gray/web-design.svg"
                  width={400}
                  height={400}
                />
                <p className="text-lg text-stone-500">
                  You do not have any school registerd yet. Create one to get started.
                </p>
              </div>
            )
            }
        </Suspense>
      </div>
    </DashboardShell>
  )
}
