import { GuardianAddForm } from "@/components/forms/form-guardian-add";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
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
import { getSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";


export default async function StudentPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  // if (!session) {
  //   console.log(`not session, redirecting to /login`)
  //   redirect("/login");
  // }
  const student = await getStudent(params.id as string);
  if (!student) {
    return (
      <p>No student found</p>
    )
  }
  const guardians = student.guardians;
  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-8 md:px-6">
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>
             Option 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option 2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option 3
            </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
         <div className="flex w-full flex-col items-center justify-between rounded-lg p-6 shadow-md md:flex-row">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
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
              <h3 className="mb-4 text-lg font-bold"> Student Academic performance insights</h3>
              {/* <BarChart className="w-full aspect-[16/9]" /> */}
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
    </>
  );

}
