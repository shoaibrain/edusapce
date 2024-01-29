import { SchoolRegisterForm } from "@/components/forms/form-school-register"
import { getCurrentUser } from "@/lib/session"


export const metadata = {
  title: "Register School",
  description: "Register School to get started.",
}
 const API_URL = process.env.API_URL;

export default async function SchoolRegisterPage() {
  const tenant = await getCurrentUser()
  return (
    <>
      <div className="space-y-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <p className="text-md font-bold underline">Register School </p>
         {
          tenant?(
            <SchoolRegisterForm tenantId={tenant.id}/>
          ):(
            <p className="text-md font-bold underline">Something seems wrong, contact support.</p>
          )
         }
      </div>
    </div>

    </>
  )
}