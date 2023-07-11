import { notFound, redirect } from "next/navigation";
import { Student, User } from "@prisma/client";
import prisma from "@/lib/db";
import Image from 'next/image'
 
async function getGuardian(studentId: Student["id"]) {
  return await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      guardians: true,
    },
  });
}


interface GuardianPageProps {
  params: { guardianId: string };
}

export default async function GuardianPage({ params }: GuardianPageProps) {
  const guardian = await getGuardian(params.guardianId);
  if (!guardian) {
    notFound();
  }
  const { firstName, lastName, email, phone, address } = guardian;
  
  return (
    <div className="grid grid-cols-1 grid-rows-4">
      <div className="grid grid-cols-1 bg-gray-200 p-2 md:grid-cols-2">
        <div className="md:row-span-2">
            <div>
            <p>{`firstName:${firstName}`}</p>
            <p>{`lastName:${lastName}`}</p>
            </div>
        </div>
        <div className="md:row-span-2">
            <p>{`email:${email}`}</p>
            <p>{`phone:${phone}`}</p>
            <p>{`address:${address}`}</p>
        </div>
      </div>
    </div>
  );
  
}
