import { GuardianAddForm } from "@/components/forms/form-guardian-add";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { getStudent } from "@/services/service-student";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";

import Link from "next/link";
import { DashboardShell } from "@/components/shell";



export const metadata: Metadata = {
  title: "Student",
  description: "Student Profile Page",
}

export default async function StudentPage({ params }: { params: { id: string, studentId: string } }) {
  const studentId = params.studentId;
  const schoolId = params.id;
  const student = await getStudent(studentId);
  if (!student) {
    return (
      <p>No student found</p>
    )
  }
  const guardians = student.guardians;
  const classGrade = student.yearGradeLevel;

  return (
    <DashboardShell>
       <div className="flex flex-col space-y-6">
         <div className="items-center justify-between rounded-lg p-6 shadow-md md:flex-row">
              <div className="flex items-center space-x-4">
                <Avatar className="size-24">
                  <AvatarImage alt="Student Name" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{`${student.firstName} ${student.lastName}`}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{`Contact number: ${student.phone}`}</p>
                  <p className="text-gray-500 dark:text-gray-400">{`Email: ${student.email}`}</p>
                  <p className="text-gray-500 dark:text-gray-400">{`Enrollment Status: ${student.enrollmentStatus}`}</p>
                </div>
              </div>
        </div>
        <section className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className=" rounded-lg p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold">Student Academics</h3>
          {classGrade && (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400">{`Class Grade: ${classGrade.levelName}`}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{`School Level: ${classGrade.levelCategory}`}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{`Class Grade Order: ${classGrade.levelOrder}`}</p>
            </>
          )}
          {!classGrade && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Class grade information unavailable.</p>
          )}
        </div>

          <div className="rounded-lg p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Guardians Contacts:</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {guardians.map((guardian, index) => (
                <li key={index} className="py-4">
                  <h4 className="text-gray-600 dark:text-gray-400">{`Name: ${guardian.firstName} ${guardian.lastName}`}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{ `Phone: ${guardian.phone}`}</p>
                </li>
              ))}
              <li className="py-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Parent</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
                  <DialogHeader>
                    <DialogTitle>Add New Parent</DialogTitle>
                    <DialogDescription>
                      Fill out the information for new guardian. click Save when done.
                    </DialogDescription>
                  </DialogHeader>
                    <GuardianAddForm schoolId={student.schoolId} studentId={student.id} />
                </DialogContent>
              </Dialog>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </DashboardShell>
  );

}
