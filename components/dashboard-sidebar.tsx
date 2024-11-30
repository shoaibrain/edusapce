"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"
import {
  ArrowLeft,
  BarChart3,
  User,
  LayoutDashboard,
  Settings,
  GraduationCap,
  Contact,
  Command,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  user: {
    name: string
    email: string
    image: string
  }
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments()
  const pathname = usePathname()

  const extractIds = React.useMemo(() => {
    const schoolMatch = pathname?.match(/\/school\/([^\/]+)/)
    const studentMatch = pathname?.match(/\/student\/([^\/]+)/)
    const employeeMatch = pathname?.match(/\/employee\/([^\/]+)/)

    return {
      schoolId: schoolMatch ? schoolMatch[1] : undefined,
      studentId: studentMatch ? studentMatch[1] : undefined,
      employeeId: employeeMatch ? employeeMatch[1] : undefined,
    }
  }, [pathname])

  const { schoolId, studentId, employeeId } = extractIds

  const tabs = React.useMemo(() => {
    const firstSegment = segments[0] ?? ""
    const thirdSegment = segments[2] ?? ""
    const fourthSegment = segments[3] ?? ""

    if (fourthSegment === "student" && studentId) {
      return [
        {
          name: "Academics",
          href: `/school/${schoolId}/student/${studentId}/academics`,
          icon: GraduationCap,
          isActive: segments.includes("academics"),
        },
        {
          name: "Settings",
          href: `/school/${schoolId}/student/${studentId}/settings`,
          icon: Settings,
          isActive: segments.includes("settings"),
        },
      ]
    } else if (fourthSegment === "employee" && employeeId) {
      return [
        {
          name: "Settings",
          href: `/school/${schoolId}/employee/${employeeId}/settings`,
          icon: Settings,
          isActive: segments.includes("settings"),
        },
      ]
    } else if (firstSegment === "school" && schoolId) {
      return [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: ArrowLeft,
        },
        {
          name: "Academics",
          href: `/school/${schoolId}/academics`,
          isActive: segments.includes("academics"),
          icon: GraduationCap,
        },
        {
          name: "Students",
          href: `/school/${schoolId}/students`,
          isActive: segments.includes("students"),
          icon: Contact,
        },
        {
          name: "Employees",
          href: `/school/${schoolId}/employees`,
          isActive: segments.includes("employees"),
          icon: User,
        },
        {
          name: "Guardians",
          href: `/school/${schoolId}/guardians`,
          isActive: segments.includes("guardians"),
          icon: User,
        },
        {
          name: "Analytics &",
          href: `/school/${schoolId}/analytics`,
          isActive: segments.includes("analytics"),
          icon: BarChart3,
        },
        {
          name: "Settings",
          href: `/school/${schoolId}/settings`,
          isActive: segments.includes("settings"),
          icon: Settings,
        },
      ]
    }
    return [
      {
        name: "Dashboard",
        href: "/dashboard",
        isActive: segments.length === 0,
        icon: LayoutDashboard,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: firstSegment === "settings",
        icon: Settings,
      },
    ]
  }, [segments, schoolId, studentId, employeeId])

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Dashboard</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {tabs.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
