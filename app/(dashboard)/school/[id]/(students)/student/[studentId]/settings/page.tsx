//@ts-nocheck
import { StudentEditForm } from "@/components/forms/form-student-edit";
import { studentGetAction } from "@/lib/actions/student-actions";

export default async function StudentSettingsIndex({ params}: {params: { id: string, studentId: string }}) {
 const schoolId = params.id;
 const studentId = params.studentId;
  const student = await studentGetAction(studentId);

  if (!student) {
    return (
      <>
      <div className="flex flex-col space-y-6">
      <div>Student not found!</div>;
      </div>
      </>
    )}
  return (
    <>
    <div className="flex flex-col space-y-6">
      {JSON.stringify(student)}
    <StudentEditForm student={student} />
    </div>
    </>
  );
}
