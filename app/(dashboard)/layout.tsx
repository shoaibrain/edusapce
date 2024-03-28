"use client"

import { notFound } from "next/navigation"

import { UserAccountNav } from "@/components/user-account-nav"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import DashboardSideNav from "@/components/dashboard-sidenav"
import React from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Nav } from "./nav"
import { Archive } from "lucide-react"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

interface LayoutProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export  async function DashboardLayout({
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
          <DashboardSideNav
          />
        </aside>
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}

export default function Layout (
  {
    defaultLayout = [265, 440, 655],
    defaultCollapsed = false,
    navCollapsedSize,
  }: LayoutProps
){
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`
          }}
          className="h-full max-h-[800px] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            // @ts-ignore
            onCollapse={(collapsed) => {
              setIsCollapsed(collapsed)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                collapsed
              )}`
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Inbox",
                  label: "128",
                  icon: Archive,
                  variant: "default",
                },
                {
                  title: "Drafts",
                  label: "9",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Junk",
                  label: "23",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Trash",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Archive",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                },
              ]}
            />
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Social",
                  label: "972",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Updates",
                  label: "342",
                  icon: Archive,
                  variant: "ghost",
                },
                {
                  title: "Forums",
                  label: "128",
                  icon: Archive,
                  variant: "ghost",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <h1>TAB</h1>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <h1>MAIL DISPLAY</h1>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    )
}
