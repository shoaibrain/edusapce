import { getEmployee } from "@/services/service-employee";

export default async function EmployeeSettingsIndex({
  params,
}: {
  params: { id: string, employeeId: string };
}) {
  const schoolId = params.id
  const employeeId = params.employeeId;
  const employee = getEmployee(employeeId);
  if (!employee) {
    return (
      <>
      <div className="flex flex-col space-y-6">
      <div>Employee not found!</div>;
      </div>
      </>
    )}
  return (
    <>
    <div className="flex flex-col space-y-6">
      <p>{JSON.stringify(employee)}</p>
    </div>
    </>
  );
}
