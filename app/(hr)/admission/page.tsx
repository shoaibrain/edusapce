import { StudentAdmissionForm } from "@/components/forms/form-student-admit"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Admission",
  description: "student admission form",
}

export default function AdmissionPage() {

  return (
      <StudentAdmissionForm />
  )
}
