"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Globe,
  User,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import {  useEffect, useMemo, useState } from "react";

export default function DashboardSideNav() {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [schoolId, setSchoolId] = useState<string | null>();

  const tabs = useMemo(() => {
    if (segments[0] === "school" && id) {
      return [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Academics",
          href: `/school/${id}/academics`,
          isActive: segments.includes("academics"),
          icon: <LayoutDashboard width={18} />,
        },
        {
          name: "Students",
          href: `/school/${id}/students`,
          isActive: segments.includes("students"),
          icon: <User width={18} />,
        },
        {
          name: "Employees",
          href: `/school/${id}/employees`,
          isActive: segments.includes("employees"),
          icon: <User width={18} />,
        },
        {
          name: "Guardians",
          href: `/school/${id}/guardians`,
          isActive: segments.includes("guardians"),
          icon: <User width={18} />,
        },
        {
          name: "Analytics & Reports",
          href: `/school/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/school/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Home",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, schoolId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <nav className="grid items-start gap-2">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
    </nav>
  );
}
