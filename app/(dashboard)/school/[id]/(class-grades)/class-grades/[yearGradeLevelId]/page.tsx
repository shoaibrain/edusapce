//@ts-nocheck
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
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";




export const metadata: Metadata = {
  title: "Class Grade",
  description: "Class Grade Page",
}

export default async function ClassGradesPage({ params }: { params: { yearGradeLevelId: string } }) {
  const student = await getStudent(params.yearGradeLevelId as string);
  const classGrade = await getYearGradeLevelById(params.yearGradeLevelId as string);
  if (!classGrade) {
    return (
      <p>No year grade level found</p>
    )
  }

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
            <DropdownMenuCheckboxItem >
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option
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

              </div>
        </div>
        <section className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">

          <h3 className="mb-4 text-lg font-bold">Student Academics</h3>


          <div className="rounded-lg p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Guardians Contacts:</h3>


          </div>
        </section>
      </div>
     </div>
    </>
  );
}
