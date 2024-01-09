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
    // {
    //   title: "Academics",
    //   href: "/dashboard/academics",
    //   disabled: true,
    //   icon: "library"
    // },
    {
      title: "Students",
      href: "/dashboard/students",
      disabled: false,
      icon: "student"
    },
    {
      title: "Employees",
      href: "/dashboard/employees",
      disabled: false,
      icon: "employee"
    },
    {
      title: "Guardians",
      href: "/dashboard/guardians",
      disabled: false,
      icon: "users"
    },
    {
      title: "School Settings",
      href: "/school",
      disabled: false,
      icon: "school",
      // TODO: show sub items under accordion
      subItems: [
        {
          title: "Academic Settings",
          href: "/school/academics",
          disabled: false,
        },
        {
          title: "Class & Grade Settings",
          href: "/school/grades",
          disabled: false,
        },
      ],
    }
  ],
  tenantSettingsNav: [
    {
    title: "Profile",
    href: "/settings",
    disabled: false,
    icon: "employee",
    },
    {
      title: "Notifications",
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
  ]
}
