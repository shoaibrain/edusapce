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
      title: "Employees",
      href: "/dashboard/employees",
      disabled: false,
      icon: "users"
    },
    {
      title: "Guardians",
      href: "/dashboard/guardians",
      disabled: false,
      icon: "users"
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      disabled: false,
      icon: "account"
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      disabled: false,
      icon: "class"
    },
    {
      title: "Exams",
      href: "/dashboard/exams",
      disabled: false,
      icon: "exam"
    },
  ],
}
