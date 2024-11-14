import { notFound } from "next/navigation"

import { UserAccountNav } from "@/components/user-account-nav"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"

import React from "react"
import DashboardSideNav from "@/components/dashboard-sidenav"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"


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
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* put a dynamic Breadcrumb */}
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Your Schools
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </main>
      </SidebarInset>

    </SidebarProvider>
  )
}
