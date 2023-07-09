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
      icon: "dashboard",
    },
    {
      title: "Students",
      href: "/dashboard/students",
      disabled: false,
      icon: "users"
    },
    {
      title: "Teachers",
      href: "/dashboard/teachers",
      disabled: true,
      icon: "users"
    },
    {
      title: "Guardians",
      href: "/dashboard/guardians",
      disabled: true,
      icon: "users"
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      disabled: true,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      disabled: true,
    },
    {
      title: "Exams",
      href: "/dashboard/exams",
      disabled: true,
    },
  ],
}
