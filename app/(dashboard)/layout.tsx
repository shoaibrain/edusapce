import { notFound } from "next/navigation"

import { UserAccountNav } from "@/components/user-account-nav"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import DashboardSideNav from "@/components/dashboard-sidenav"



interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAccountNav
            user = {{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardSideNav />
        </aside>
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
