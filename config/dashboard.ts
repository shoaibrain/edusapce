import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      disabled: false,
    },
    {
      title: "Students",
      href: "/dashboard/students",
      icon: "people",
      disabled: false,
    },
    {
      title: "Teachers",
      href: "/dashboard/teachers",
      icon: "organization",
      disabled: false,
    },
    {
      title: "Parents",
      href: "/dashboard/parents",
      icon: "people",
      disabled: false,
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      icon: "Account",
      disabled: false,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: "class",
      disabled: false,
    },
    {
      title: "Exams",
      href: "/dashboard/exams",
      icon: "exam",
      disabled: false,
    },
  ],
}
