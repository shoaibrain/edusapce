import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { getEmployee } from "@/services/service-employee";


export default async function EmployeeLayout({
  params,
  children,
}: {
  params: { id: string, employeeId: string };
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  );
}
