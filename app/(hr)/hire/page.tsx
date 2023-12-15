
import { EmployeeHireForm } from "@/components/form-employee-hire"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Hire Form",
  description: "employment applicaiton form",
}

export default function AdmissionPage() {

  return (
        <EmployeeHireForm/>
  )
}
