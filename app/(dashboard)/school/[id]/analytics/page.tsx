import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Analytics",
  description: "School Analytics Dashboard",
}

export default function SchoolOverviewIndexPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <>

      <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          School Analytics Index Page
        </h1>
      </div>
    </div>
    </>
  );
}
