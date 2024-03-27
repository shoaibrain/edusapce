import { EmployeeEditForm } from "@/components/forms/form-employee-edit";
import { getEmployee } from "@/services/service-employee";

export default async function EmployeeSettingsIndex({
  params,
}: {
  params: { id: string };
}) {

  const employee = await getEmployee(params.id);

  return (
    <>
      <EmployeeEditForm employee={employee}/>
    </>
  );
}
