import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { StudentAdmissionForm } from "@/components/student-admission-form"


export const metadata = {
  title: "Admit a student",
  description: "Admit a student to get started",
}

export default function AdmissionPage() {
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-4">
              <StudentAdmissionForm />
         </div>
    </div>
  )
}
