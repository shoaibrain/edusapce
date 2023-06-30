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
      disabled: false,
    },
    {
      title: "Students",
      href: "/dashboard/students",
      disabled: false,
    },
    {
      title: "Teachers",
      href: "/dashboard/teachers",
      disabled: false,
    },
    {
      title: "Guardians",
      href: "/dashboard/guardians",
      disabled: false,
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      disabled: false,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      disabled: false,
    },
    {
      title: "Exams",
      href: "/dashboard/exams",
      disabled: false,
    },
  ],
}
