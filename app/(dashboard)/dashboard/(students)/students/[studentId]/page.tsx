import { notFound } from "next/navigation";
import { Student } from "@prisma/client";
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
import { StudentEditForm } from "@/components/form-student-edit";
import { GuardianCard } from "@/components/guardian-card";
import { GuardianInfoForm } from "@/components/form-guardian";
import { StudentCard } from "@/components/student-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Details",
  description: "Student Dashboard",
}
interface StudentPageProps {
  params: { studentId: string };
}
const URL = 'https://project-eduspace.vercel.app';

async function getStudent(studentId: Student["id"]) {
  try {
    const res = await fetch(`${URL}/api/students/${studentId}`,{
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
    console.error('Error fetching students:', error);
    throw error;
  }
}
export default async function StudentPage({ params }: StudentPageProps) {
  const student = await getStudent(params.studentId);
  if (!student) {
    notFound();
  }
  const { guardians } = student;

  return (
    <div>
      <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {`${student.firstName} ${student.lastName}`}
      </h2>
      <p className="text-base leading-7 text-gray-700">{`id: ${student.id}`}</p>
        <div className="p-4">
          <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Update Student Profile</Button>
                </DialogTrigger>
                <DialogContent className="mx-auto sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Update Student Information</DialogTitle>
                    <DialogDescription>
                      Edit student information here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                    <StudentEditForm student={student}/>
                </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <StudentCard student={student}/>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Guardians</h2>
            <div className="p-4">
              <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Add New Parent</Button>
                    </DialogTrigger>
                    <DialogContent className="mx-auto sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>{`Add New Parent for studentId: ${student.id}`} </DialogTitle>
                        <DialogDescription>
                          Add parent information here. Click save when you are done.
                        </DialogDescription>
                      </DialogHeader>
                    <GuardianInfoForm studentId = {params.studentId}/>
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
