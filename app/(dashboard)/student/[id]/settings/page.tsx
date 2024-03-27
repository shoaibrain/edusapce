import { StudentSettingsForm } from "@/components/forms/form-student-edit";
import { getStudent } from "@/services/service-student";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Settings",
  description: "Student settings page",
}

export default async function StudentSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudent(params.id);
  if (!student) {
    return (
      <>
      <div className="flex flex-col space-y-6">
      <div>Student not found! try refresh</div>;
      </div>
      </>
    )}
  return (
    <>
    <div className="flex flex-col space-y-6">
    <StudentSettingsForm student={student} />
    </div>
    </>
  );
}
