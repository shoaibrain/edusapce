"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  User,
  LayoutDashboard,
  Settings,
  GraduationCap,
  Contact,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function DashboardSideNav() {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();

  console.log('Current pathname:', pathname);
  console.log('Current segments:', segments);

  // Extract IDs from the URL
  const extractIds = useMemo(() => {
    const schoolMatch = pathname?.match(/\/school\/([^\/]+)/);
    const studentMatch = pathname?.match(/\/student\/([^\/]+)/);
    const employeeMatch = pathname?.match(/\/employee\/([^\/]+)/);

    return {
      schoolId: schoolMatch ? schoolMatch[1] : undefined,
      studentId: studentMatch ? studentMatch[1] : undefined,
      employeeId: employeeMatch ? employeeMatch[1] : undefined,
    };
  }, [pathname]);

  const { schoolId, studentId, employeeId } = extractIds;


  const tabs = useMemo(() => {
    console.log('Recalculating tabs');
    const firstSegment = segments[0] ?? "";
    const thirdSegment = segments[2] ?? "";
    const fourthSegment = segments[3] ?? "";

    console.log(`firstSegment: ${firstSegment}`)
    console.log(`secondSegment: ${segments[1]}`)
    console.log(`thirdSegment: ${thirdSegment}`)
    console.log(`fourthSegment: ${fourthSegment}`)


    // Check for student route first
    if (fourthSegment === "student" && studentId) {
      return [
        {
          name: "Academics",
          href: `/school/${schoolId}/student/${studentId}/academics`,
          icon: <GraduationCap width={18} />,
          isActive: segments.includes("academics"),
        },
        {
          name: "Settings",
          href: `/school/${schoolId}/student/${studentId}/settings`,
          icon: <Settings width={18} />,
          isActive: segments.includes("settings"),
        },
      ];
    }
    // Then check for employee route
    else if (fourthSegment === "employee" && employeeId) {
      return [
        {
          name: "Settings",
          href: `/school/${schoolId}/employee/${employeeId}/settings`,
          icon: <Settings width={18} />,
          isActive: segments.includes("settings"),
        },
      ];
    }
    // Then check for school route
    else if (firstSegment === "school" && schoolId) {
      return [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Academics",
          href: `/school/${schoolId}/academics`,
          isActive: segments.includes("academics"),
          icon: <GraduationCap width={18} />,
        },
        {
          name: "Students",
          href: `/school/${schoolId}/students`,
          isActive: segments.includes("students"),
          icon: <Contact width={18} />,
        },
        {
          name: "Employees",
          href: `/school/${schoolId}/employees`,
          isActive: segments.includes("employees"),
          icon: <User width={18} />,
        },
        {
          name: "Guardians",
          href: `/school/${schoolId}/guardians`,
          isActive: segments.includes("guardians"),
          icon: <User width={18} />,
        },
        {
          name: "Analytics & Reports",
          href: `/school/${schoolId}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/school/${schoolId}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    // Default route
    return [
      {
        name: "Dashboard",
        href: "/dashboard",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: firstSegment === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, schoolId, studentId, employeeId]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
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
