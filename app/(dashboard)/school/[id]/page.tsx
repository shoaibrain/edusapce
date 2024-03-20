import prisma from "@/lib/db";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "School",
  description: "School Dashboard",
}
export default async function SchoolPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.school.findUnique({
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
                  <BreadcrumbPage>School</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
      </Breadcrumb>
      {
        data && (
          <div className="school-info-container flex flex-col items-center justify-between sm:flex-row sm:space-y-0">
      <div className="school-details flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <h2 className="school-name text-2xl font-semibold mb-2">{data.name}</h2>
        <div className="school-contact-info">
          <p className="contact-label">Address:</p>
          <p className="contact-value">{data.address}</p>
          <p className="contact-label">Phone:</p>
          <p className="contact-value">{data.phone}</p>
          <p className="contact-label">Email:</p>
          <a href={`mailto:${data.email}`} className="contact-value text-blue-500 hover:underline">{data.email}</a>
          <p className="contact-label">Website:</p>

        </div>
      </div>
      {/* Additional school information can be added here conditionally if included in data */}
      {data.description && (
        <div className="school-description mt-4 sm:mt-0">
          <p className="description-label">Description:</p>
          <p className="description-value">{data.description}</p>
        </div>
      )}
    </div>
        )
      }
    </>
  );
}
