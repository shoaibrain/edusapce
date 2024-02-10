
// @ts-nocheck
import { StudentSettingsForm } from "@/components/forms/form-student-edit";
import { getStudent } from "@/services/service-student";

export default async function StudentSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudent(params.id);
  return (
    <div className="flex flex-col space-y-6">
     <StudentSettingsForm student={student} />
    </div>
  );
}
