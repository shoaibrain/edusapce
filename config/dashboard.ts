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
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: "student",
      disabled: true,
    },

    {
      title: "Students",
      href: "/dashboard/students",
      icon: "student",
      disabled: true,
    },
    {
      title: "Staffs",
      href: "/dashboard/staffs",
      icon: "people",
      disabled: true,
    },
    {
      title: "Billings",
      href: "/dashboard/billings",
      icon: "dollar-sign",
      disabled: true,
    },
    {
      title: "Curriculum",
      href: "/dashboard/curriculum",
      icon: "book",
      disabled: true,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
