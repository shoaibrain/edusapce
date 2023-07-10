import { notFound, redirect } from "next/navigation";
import { Student, User } from "@prisma/client";
import prisma from "@/lib/db";
import Image from 'next/image'
 
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
  const { firstName,middleName, lastName,birthDate,currentGrade, email, phone, address, guardians } = student;
  
  return (
    <div className="grid grid-cols-1 grid-rows-4">
      <div className="grid grid-cols-1 bg-gray-200 p-2 md:grid-cols-2">
        <div className="md:row-span-2">
            <div>
            <p>{`firstName:${firstName}`}</p>
            <p>{`middleName:${middleName}`}</p>
            <p>{`lastName:${lastName}`}</p>
            <p>{`birthDate:${birthDate}`}</p>
            </div>
        </div>
        <div className="md:row-span-2">
            <p>{`currentGrade:${currentGrade}`}</p>
            <p>{`email:${email}`}</p>
            <p>{`phone:${phone}`}</p>
            <p>{`address:${address}`}</p>
        </div>
      </div>

      <div className="bg-gray-300 p-2">
        {/* A grid of continuous block, that is of one colums on screen and the cloumn number gets bigger as screen
        size gets bigger 
        */}


        {
          guardians.map((guardian) => {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:row-span-2">
                  <p>{`firstName:${guardian.firstName}`}</p>
                  <p>{`lastName:${guardian.lastName}`}</p>
                  <p>{`email:${guardian.email}`}</p>
                  <p>{`phone:${guardian.phone}`}</p>
                  <p>{`address:${guardian.address}`}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="bg-gray-200 p-2">
        {/* Student enrollment details */}
      </div>
      
    </div>
  );
  
}
