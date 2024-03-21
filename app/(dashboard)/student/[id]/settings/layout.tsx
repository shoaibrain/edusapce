import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import StudentSettingsNav from "./nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default async function StudentSettingsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {

  const session = await getServerSession(authOptions)

  console.log(`session: ${JSON.stringify(session)}`)

  if (!session) {
    redirect("/login");
  }

  const data = await prisma.student.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <>
          <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/" >Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href={`/student/${params.id}`}>Student</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-cal text-l font-bold dark:text-white sm:text-3xl">
          settings for {data?.firstName} {data?.lastName}
        </h1>
      </div>
      <StudentSettingsNav />
      {children}
    </>
  );
}
