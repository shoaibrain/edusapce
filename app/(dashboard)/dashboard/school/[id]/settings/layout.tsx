import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import SchoolSettingsNav from "./nav";
import { getSession } from "next-auth/react";
import prisma from "@/lib/db";

export default async function SchoolSiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.school.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.id !== session.user.id) {
    notFound();
  }

  // const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
          Settings for {data.name}
        </h1>
      </div>
      <SchoolSettingsNav />
      {children}
    </>
  );
}
