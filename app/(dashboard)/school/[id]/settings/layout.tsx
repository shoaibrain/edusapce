import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default async function SchoolSettingsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.school.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.tenantId !== session.user.id) {
    notFound();
  }

  return (
    <>
      <Breadcrumb className="m-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/">Home</Link>
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
                    <Link href= {`/school/${params.id}`}>School</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
      </Breadcrumb>
      {children}
    </>
  );
}
