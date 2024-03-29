"use client"
import { MainNav } from "@/components/main-nav"
import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Nav } from "./nav"
import {  Inbox, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"



interface DashboardLayoutProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children?: React.ReactNode
}

export  default function DashboardLayout({
  children,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardLayoutProps) {

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const onCollapse = () => {
    setIsCollapsed(true);
  };

  const onExpand = () => {
    setIsCollapsed(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
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
                onCollapse={onCollapse}
                onExpand={onExpand}
                className={cn(
                  isCollapsed &&
                    "min-w-[50px] transition-all duration-300 ease-in-out"
                )}
              >
                <div
                  className={cn(
                    "flex h-[52px] items-center justify-center",
                    isCollapsed ? "h-[52px]" : "px-2"
                  )}
                >
                    <h1 className="text-xl font-bold">Current User</h1>
                </div>
                <Separator />
                <Nav
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: "Inbox",
                      label: "128",
                      icon: Inbox,
                      variant: "default",
                    },
                    {
                      title: "Drafts",
                      label: "9",
                      icon: Inbox,
                      variant: "ghost",
                    },
                    {
                      title: "Drafts",
                      label: "9",
                      icon: Inbox,
                      variant: "ghost",
                    },
                    {
                      title: "Drafts",
                      label: "9",
                      icon: Inbox,
                      variant: "ghost",
                    }
                  ]}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

                <ResizablePanel defaultSize={defaultLayout[1]}>
                    <div className="flex items-center px-4 py-2">
                      <h1 className="text-xl font-bold">Search Console</h1>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <form>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search / Execute command" className="pl-8" />
                        </div>
                      </form>
                    </div>
                </ResizablePanel>

              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[2]}  minSize={60}>
                {children}
              </ResizablePanel>
          </ResizablePanelGroup>
      </TooltipProvider>
      <SiteFooter className="border-t" />
    </>
  )
}

