import { EmployeeEditForm } from "@/components/forms/form-employee-edit";
import { GuardianEditForm } from "@/components/forms/form-guardian-edit";
import { getGuardian } from "@/services/service-guardian";


export default async function GuardianSettingsIndex({
  params,
}: {
  params: { id: string };
}) {

  const guardian = await getGuardian(params.id);

  return (
    <>
      <GuardianEditForm guardian={guardian}/>
    </>
  );
}
