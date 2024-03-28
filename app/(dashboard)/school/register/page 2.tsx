import { SchoolRegisterForm } from "@/components/forms/form-school-register";
import { getCurrentUser } from "@/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Registration",
  description: "School Registration Page",
}

export default async function SchoolRegistration({ params }: { params: { id: string } }) {
  // get current user
  const tenant = await getCurrentUser()


  return (
    <>
      {tenant ? (
      <SchoolRegisterForm tenantId={tenant.id} />
              ) : (
      <p>Not authorized</p>
        )}
    </>
  );

}
