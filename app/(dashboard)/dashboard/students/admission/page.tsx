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
              <div className="flex flex-col space-y-2 text-center">
                    <Icons.logo className="mx-auto h-3 w-3" />
                    <h1 className="text-2xl font-semibold tracking-tight">Student Admission Form</h1>
                    <p className="text-sm text-muted-foreground">Enter student information below for Admission</p>
              </div>
              <StudentAdmissionForm />
         </div>
    </div>
  )
}
