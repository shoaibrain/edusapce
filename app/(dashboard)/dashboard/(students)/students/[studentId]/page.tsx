import { notFound } from "next/navigation";
import { Student } from "@prisma/client";
import { Metadata } from "next";
import { ProfileOptions } from "@/components/profile-options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuardianCard } from "@/components/guardian-card";
import { Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GuardianAddForm } from "@/components/forms/form-guardian-add";


export const metadata: Metadata = {
  title: "Student Details",
  description: "Student Dashboard",
}

interface StudentPageProps {
  params: { studentId: string };
}
const URL = "http://localhost:3000/api/v1";

async function getStudent(studentId: Student["id"]) {
  try {
    const res = await fetch(`${URL}/students/${studentId}`,{
      method : 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch student data')
    }
    return res.json();
  } catch(error) {
    throw error;
  }
}
export default async function StudentPage({ params }: StudentPageProps) {
  const student = await getStudent(params.studentId);
  if (!student) {
    notFound();
  }
  const guardians = student.guardians || [];

  return (
    <div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-sm font-medium">
            {`Student: ${student.firstName} ${student.lastName}`}
          </h2>
          <div className="flex items-center space-x-2">
            <ProfileOptions student = {student} />
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="p-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="guardians" >Guardians</TabsTrigger>
                <TabsTrigger value="accounts" disabled>Academics</TabsTrigger>
                <TabsTrigger value="medicals" disabled>Medicals</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                  <div>
                    <dt className="text-sm font-medium">First Name</dt>
                    <dd className="text-sm font-medium">{student.firstName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Middle Name</dt>
                    <dd className="text-sm font-medium">{student.middleName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Last Name</dt>
                    <dd className="text-sm font-medium">{student.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Birth Date</dt>
                    <dd className="text-sm font-medium">{student.birthDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Gender</dt>
                    <dd className="text-sm font-medium">{student.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Grade Level</dt>
                    <dd className="text-sm font-medium">{student.currentGrade}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Nationality</dt>
                    <dd className="text-sm font-medium">{student.nationality}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Email</dt>
                    <dd className="text-sm font-medium">{student.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Phone No.</dt>
                    <dd className="text-sm font-medium">{student.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Home Address</dt>
                    <dd className="text-sm font-medium">{student.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Enrollment Status</dt>
                    <dd className="text-sm font-medium">{student.enrollmentStatus}</dd>
                  </div>
                </div>

              </TabsContent>
              <TabsContent value="guardians">
               {guardians.length > 0 ? (
                  guardians.map((guardian) => (
                    <GuardianCard key={guardian.id} parent={guardian} />
                  ))
                ) : (
                  <p className="text-sm font-medium">No guardian found</p>
                )}
              <div className="p-4">
                <Dialog>
                      <DialogTrigger asChild>
                      <Button variant={"outline"}> Add Guardian </Button>
                      </DialogTrigger>
                      <DialogContent className="mx-auto sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>Add Parent for {student.firstName}</DialogTitle>
                          <DialogDescription>
                            Enter guardian information here. Click save when you are done.
                          </DialogDescription>
                        </DialogHeader>
                        <GuardianAddForm studentId={student.id}/>
                      </DialogContent>
                </Dialog>
              </div>
              </TabsContent>
              <TabsContent value="accounts">Account Details</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
