import { SchoolRegisterForm } from "@/components/forms/form-school-register"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register School",
  description: "Register School to get started.",
}

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
