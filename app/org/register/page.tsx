import { SchoolRegisterForm } from "@/components/forms/form-school-register"

export const metadata = {
  title: "School Register",
  description: "Register School to get started.",
}

export default function SchoolRegisterPage() {
  return (
    <>
      <div className="space-y-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <SchoolRegisterForm />
      </div>
    </div>

    </>
  )
}
