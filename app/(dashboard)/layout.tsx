import { notFound, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Breadcrumbs from "@/components/breadcrumbs"

interface DashboardLayoutProps {
  children?: React.ReactNode;
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
            <Breadcrumbs />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
