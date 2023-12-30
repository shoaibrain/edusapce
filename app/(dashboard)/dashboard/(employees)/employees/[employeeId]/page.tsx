import { ProfileOptions } from "@/components/profile-options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Employee Details",
  description: "Employee Details",
}
interface EmployeePageProps {
  params: { employeeId: string };
}
const API_URL = process.env.API_URL;

async function getEmployee(employeeId: Employee["id"]) {
  try {
    const res = await fetch(`${API_URL}/employees/${employeeId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      next: { revalidate: 5 },
    })
    if (!res.ok) {
      throw new Error("Failed to fetch employee data")
    }
    return res.json();
  } catch(error) {
    throw error
  }
}

export default async function EmployeePage({ params }: EmployeePageProps){
  const employee = await getEmployee(params.employeeId);
  if (!employee) {
    notFound();
  }

  return (
    <div>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-sm font-medium">
          {`${employee.firstName} ${employee.lastName}`}
        </h2>
        <div className="flex items-center space-x-2">
          <ProfileOptions employee = {employee} />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="p-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes" >Classes</TabsTrigger>
              {/* TODO: Should billing be applied to student or guardian? */}
              <TabsTrigger value="hr" disabled>Human Resource</TabsTrigger>
              <TabsTrigger value="communications" disabled>Communications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium">First Name</dt>
                  <dd className="text-sm font-medium">{employee.firstName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Middle Name</dt>
                  <dd className="text-sm font-medium">{employee.middleName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Last Name</dt>
                  <dd className="text-sm font-medium">{employee.lastName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Birth Date</dt>
                  <dd className="text-sm font-medium">{employee.birthDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Gender</dt>
                  <dd className="text-sm font-medium">{employee.gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Email</dt>
                  <dd className="text-sm font-medium">{employee.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Phone No.</dt>
                  <dd className="text-sm font-medium">{employee.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Home Address</dt>
                  <dd className="text-sm font-medium">{employee.address}</dd>
                </div>
              </div>

            </TabsContent>
            <TabsContent value="classes">
             <p>{`${employee.firstName} ${employee.lastName} is teaching following classes`}</p>
            <div className="p-4">
            </div>
            </TabsContent>
            <TabsContent value="hr">Human Resources</TabsContent>
            <TabsContent value="communications">Communications</TabsContent>
      </Tabs>
    </div>
  </div>
  )

}
