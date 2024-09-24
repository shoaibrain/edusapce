import React from 'react'

import { Metadata } from 'next'

import { EmployeeAdmissionForm } from '@/components/forms/form-employee-add'
import { getSchoolDepartments } from '@/services/service-school'
import { getTenantForSchool } from '@/services/service-tenant'

export const metadata: Metadata = {
  title: "Employee Admission",
  description: "Employees Admission Form",
}
export default async function EmployeesPage(
  { params, }: { params: { id: string }; }
) {
  const schoolId = decodeURIComponent(params.id)
  const tenant = await getTenantForSchool(schoolId);

  const existingDepartments = await getSchoolDepartments(schoolId)
  return (
    <div className="flex flex-col space-y-6">
       < EmployeeAdmissionForm
         schoolId={schoolId}
         tenantId= {tenant.id}
         existingDepartments={existingDepartments}
         />
      </div>
  )
}
