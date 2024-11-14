"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  console.log(JSON.stringify(segments));
// Todo: fix the breadcrumbs
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const segmentName = segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbLink href={href}>{segmentName}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
