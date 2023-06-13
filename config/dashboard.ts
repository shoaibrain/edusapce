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
      title: "Accountant",
      href: "/dashboard/account",
      icon: "account",
      disabled: false,
    },
    {
      title: "Admissions",
      href: "/dashboard/admissions",
      icon: "student",
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
      icon: "Teacher",
      disabled: false,
    },
    {
      title: "Parents",
      href: "/dashboard/parents",
      icon: "parents",
      disabled: false,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      disabled: false,
    },
  ],
}
