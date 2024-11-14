import { StudentAdmissionForm } from "@/components/forms/form-student-admit";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { Metadata } from "next";
import { getGradeLevelsForSchool } from "@/services/service-school";

export const metadata: Metadata = {
  title: "Student Admission",
  description: "Student Admission Form",
}

export default async function StudentAdmissionPage({
  params,
}: {
  params: { id: string };
}) {

  const classGrades = await getGradeLevelsForSchool(params.id);

  return (
    <div className="flex flex-col space-y-6">
       <h1 className="font-cal text-3xl font-bold dark:text-white">
          <StudentAdmissionForm schoolId={params.id} classGrades={classGrades}/>
        </h1>
    </div>
  );
}
