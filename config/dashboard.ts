
import { tr } from "date-fns/locale"
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
  // sidebar navs
  tenantDashboardSidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      disabled: false,
      icon: "dashboard",
    },
    {
      title: "Settings",
      href: "/settings",
      disabled: false,
      icon: "settings",
    },

  ],
  tenantSettingsNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      disabled: false,
      icon: "dashboard",
    },
    {
    title: "Profile Settings",
    href: "/settings",
    disabled: false,
    icon: "employee",
    },
    {
      title: "Emails & Notifications",
      href: "/settings/notifications",
      disabled: false,
      icon: "email",
    },
    {
      title: "Manage Schools",
      href: "/settings/schools",
      disabled: false,
      icon: "school",
    },
    {
      title: "Account",
      href: "/settings/account",
      disabled: false,
      icon: "settings",
    }
  ],
  schoolDashboardSidebarNav: [
      {
        title: "Dashboard",
        href: `/dashboard`,
        disabled: false,
        icon: "dashboard",
      },
      {
        title: "Students",
        href: "/dashboard/students",
        disabled: true,
        icon: "student",
      },
      {
        title: "Employees",
        href: "/dashboard/teachers",
        disabled: true,
        icon: "user",
      },
      {
        title: "Classes",
        href: "/dashboard/classes",
        disabled: true,
        icon: "class",
      },
  ]
}
