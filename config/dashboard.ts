import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Billings",
      href: "/admin/billings",
      icon: "dollar-sign",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: "analytics",
    },

    {
      title: "Students",
      href: "/admin/students",
      icon: "student",
    },
    {
      title: "Staffs",
      href: "/admin/staffs",
      icon: "people",
    },
    {
      title: "Curriculum",
      href: "/admin/curriculum",
      icon: "book",
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
