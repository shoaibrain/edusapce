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
      href: "/org",
      disabled: false,
      icon: "school",
      // TODO: show sub items under accordion
      subItems: [
        {
          title: "Academic Settings",
          href: "/org/academics",
          disabled: false,
        },
        {
          title: "Class & Grade Settings",
          href: "/org/grades",
          disabled: false,
        },
      ],
    }
  ],
}
