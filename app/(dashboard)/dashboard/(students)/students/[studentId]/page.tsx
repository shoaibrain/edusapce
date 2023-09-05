//@ts-nocheck
import { notFound, redirect } from "next/navigation";
import { Student, User } from "@prisma/client";
import prisma from "@/lib/db";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StudentInfoForm } from "@/components/form-student-edit";
import { GuardianCard } from "@/components/guardian-card";
import { GuardianInfoForm } from "@/components/form-guardian";


async function getStudent(studentId: Student["id"]) {
  return await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      guardians: true,
    },
  });
}


interface StudentPageProps {
  params: { studentId: string };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const student = await getStudent(params.studentId);
  if (!student) {
    notFound();
  }
  const {id, firstName,middleName, lastName,birthDate,currentGrade, gender,nationality,  email, phone, address, guardians } = student;
  let dob = birthDate.toDateString();
  
  return (
    <div>
      <div className="grid grid-cols-2 justify-between gap-4 p-2 px-5 sm:px-0 ">
        <div className="p-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900"> {`${firstName} ${lastName}`}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{`student id: ${id}`}</p>
        </div>
        <div className="p-4">
          <Dialog>
                <DialogTrigger asChild>
                {/* TODO: Dialog Button doesnt work */}
                  <Button variant="outline">Update Student Info</Button>
                </DialogTrigger>
                <DialogContent className="mx-auto sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Update Student Information</DialogTitle>
                    <DialogDescription>
                      Make changes to student Information here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                    <StudentInfoForm student={student}/>
                </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
           {/* Student Info */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="h-40 w-40 shrink-0 items-start">
                <Image
                  className="h-40 w-40"
                  src="/public/user.jpeg"
                  alt="student Image"
                  width={80}
                  height={80}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">First Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{firstName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Middle Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{middleName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Last Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{lastName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Birth Date</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{dob}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Current Class</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentGrade}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">nationality</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{nationality}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">email</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">phone</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{phone}</dd>
                </div>
              </div>

          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Guardians</h2>
                    {/* Dialog to add parent */}
        <div className="p-4">
          <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Parent</Button>
                </DialogTrigger>
                <DialogContent className="mx-auto sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>{`Add Parent for ${student.firstName}`} </DialogTitle>
                    <DialogDescription>
                      Add parent information here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader> 
                 <GuardianInfoForm />
                </DialogContent>
          </Dialog>
        </div>
          </div>


          {guardians.map((guardian) => (
            <GuardianCard parent={guardian}/>
          ))}

          {/* Academic Info */}
          <h2 className="text-base font-semibold leading-7 text-gray-900"> Academic Overview</h2>
        </dl>
      </div>
    </div>
  );
  
}
