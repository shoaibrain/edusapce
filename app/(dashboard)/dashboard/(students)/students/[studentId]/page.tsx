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
import { StudentCard } from "@/components/student-card";

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
      <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold leading-7 text-gray-900">{`${student.firstName} ${student.lastName}`}</h2>
      <p className="text-base leading-7 text-gray-700">{`id: ${student.id}`}</p>
        <div className="p-4">
          <Dialog>
                <DialogTrigger asChild>
                {/* TODO: Dialog Button doesnt work */}
                  <Button variant="outline">Update Profile</Button>
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
          <StudentCard student={student}/>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Guardians</h2>
            {/* Dialog to add parent */}
            <div className="p-4">
              <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Add New Parent</Button>
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
