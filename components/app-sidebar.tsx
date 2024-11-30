"use client"

import * as React from "react"
import {
  ArrowLeft,
  BarChart3,
  Box,
  Contact,
  GraduationCap,
  Settings2,
  User,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./main-nav"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  // Extract IDs from the URL
  const schoolMatch = pathname?.match(/\/school\/([^\/]+)/);
  const studentMatch = pathname?.match(/\/student\/([^\/]+)/);
  const employeeMatch = pathname?.match(/\/employee\/([^\/]+)/);

  const schoolId = schoolMatch ? schoolMatch[1] : undefined;
  const studentId = studentMatch ? studentMatch[1] : undefined;
  const employeeId = employeeMatch ? employeeMatch[1] : undefined;

  // Dynamically generate sidebar items based on URL
  const navMainItems = React.useMemo(() => {
    const firstSegment = segments[0] ?? "";
    const fourthSegment = segments[3] ?? "";

    if (fourthSegment === "student" && studentId) {
      return [
        {
          title: "Settings",
          url: `/school/${schoolId}/student/${studentId}/settings`,
          icon: Settings2,
          isActive: segments.includes("settings"),
        },
      ];
    } else if (fourthSegment === "employee" && employeeId) {
      return [
        {
          title: "Settings",
          url: `/school/${schoolId}/employee/${employeeId}/settings`,
          icon: Settings2,
          isActive: segments.includes("settings"),
        },
      ];
    } else if (firstSegment === "school" && schoolId) {
      return [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: ArrowLeft,
        },
        {
          title: "Academics",
          url: `/school/${schoolId}/academics`,
          icon: GraduationCap,
          isActive: segments.includes("academics"),
        },
        {
          title: "Students",
          url: `/school/${schoolId}/students`,
          icon: Contact,
          isActive: segments.includes("students"),
        },
        {
          title: "Employees",
          url: `/school/${schoolId}/employees`,
          icon: User,
          isActive: segments.includes("employees"),
        },
        {
          title: "Guardians",
          url: `/school/${schoolId}/guardians`,
          icon: User,
          isActive: segments.includes("guardians"),
        },
        {
          title: "Analytics",
          url: `/school/${schoolId}/analytics`,
          icon: BarChart3,
          isActive: segments.includes("analytics"),
        },
        {
          title: "Settings",
          url: `/school/${schoolId}/settings`,
          icon: Settings2,
          isActive: segments.includes("settings"),
        },
      ];
    }
    //default items
    return [
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: segments.includes("settings"),
      },
    ];
  }, [segments, schoolId, studentId, employeeId]);


  return (
    <Sidebar collapsible="icon" {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="/dashboard">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Box className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">eduSpace</span>
                <span className="">v1.0.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain items={navMainItems} />
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={{ name: "shoaibrain", email: "shoaib.rain@outlook.com", avatar: "/avatars/shoaibrain" }} />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
  )
}
