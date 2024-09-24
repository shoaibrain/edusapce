"use client";

interface SchoolGeneralSettingsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  schoolId: string;
}

export function SchoolAcademicSettingsForm({
  schoolId,
  ...props
 }) {
  console.log(JSON.stringify(schoolId));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <p>{`School Academic settings form. School Id: ${schoolId}`}</p>
    </div>
  );
}
