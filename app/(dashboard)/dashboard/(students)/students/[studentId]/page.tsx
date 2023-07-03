import { notFound, redirect } from "next/navigation";
import { Student, User } from "@prisma/client";
import prisma from "@/lib/db";

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

  return (
    <>
      <div className=" bg-sky-500/100">
          <p>{student.firstName + " " + student.lastName}</p>
          <p>studnet id: {student.id}</p>
          <p>email: {student.email}</p>
          <p>phone: {student.phone}</p>
          <p>address: {student.address}</p>
          
      </div>

    </>
  );
}
