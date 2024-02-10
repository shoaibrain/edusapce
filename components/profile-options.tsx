"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from "./ui/dialog"
import { GuardianEditForm } from "./forms/form-guardian-edit"
import { Employee, Guardian, Student } from "@prisma/client"
import { StudentSettingsForm } from "./forms/form-student-edit"
import { EmployeeEditForm } from "./forms/form-employee-edit"

interface ProfileOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  guardian?: Guardian;
  student?: Student;
  employee?: Employee;
}

export function ProfileOptions({
  guardian,
  student,
  employee,
  className,
  ...props}: ProfileOptionsProps){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px] px-2">
        <DropdownMenuLabel>select action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4">
            <Dialog>
                  <DialogTrigger asChild>
                    <button>Edit Profile</button>
                  </DialogTrigger>
                  <DialogContent className="mx-auto sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Update information</DialogTitle>
                      <DialogDescription>
                        Edit information here. Click save when you are done.
                      </DialogDescription>
                    </DialogHeader>
                  {student && <StudentSettingsForm student ={student} />}
                  {guardian && <GuardianEditForm guardian={guardian} /> }
                  {employee && <EmployeeEditForm employee={employee}/>}
                  </DialogContent>
            </Dialog>
        </div>
        <DropdownMenuSeparator />
        <Link href = "#" >View Students</Link>
        <DropdownMenuSeparator />
        <Link href = "#" >Pay Bills</Link>
      </DropdownMenuContent>
  </DropdownMenu>
  )
}
