import { AdmissionForm } from "@/types";
import React from "react";

interface StudentAdmissionFormOverviewProps {
    data: AdmissionForm
}

export function StudentAdmissionFormOverview({ data }: StudentAdmissionFormOverviewProps) {
    
    if (!data) {
        return null
      }

    console.log(`Data is: ${data}`)

return (
    <div className="space-y-2">
        <div className="border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Admission Form data</h2>
            <p> {`data: ${JSON.stringify(data)}`}</p>
        </div>
    </div>
  );
}
