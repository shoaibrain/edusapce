import { StudentAdmissionForm } from "@/components/forms/form-student-admit";
import prisma from "@/lib/db";
import { getGradeLevelsForSchool } from "@/services/service-school";


export default async function StudentAdmissionPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.school.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  const classGrades = await getGradeLevelsForSchool(params.id);

  return (
    <div className="flex flex-col space-y-6">
       <h1 className="font-cal text-3xl font-bold dark:text-white">
          <StudentAdmissionForm schoolId={params.id} classGrades={classGrades}/>
        </h1>
    </div>
  );
}
