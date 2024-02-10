import { getGradeLevelsForSchool, getSchool } from "@/services/service-school";
import { getStudent } from "@/services/service-student";

export default async function StudentAcademicIndex({
  params,
}: {
  params: { id: string };
}) {
  const school = await getSchool(decodeURIComponent(params.id))
  const student = await getStudent(params.id)
  let schoolGradeLevels;
  if (student?.schoolId){
     schoolGradeLevels = await getGradeLevelsForSchool(student?.schoolId)
  }
  return (
    <div className="flex flex-col space-y-6">
         <h1 className="font-cal text-l font-bold dark:text-white sm:text-3xl">
          Student Academic Details Page
        </h1>
    </div>
  );
}

async function getYearGradeLevels(schoolID: string) {
  const grade_levels = await getGradeLevelsForSchool(schoolID);
  console.log(`yearGradeLevels for school: ${schoolID}
      YearGradeLevels: ${JSON.stringify(grade_levels)}
  `)
  return grade_levels;
}
