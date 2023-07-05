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
      <div className="grid grid-flow-col grid-rows-3 gap-4 bg-sky-500/100">
         <div>
          stud infero
         </div>
         
         <div>
          stu-guardin info
         </div>

         <div>
          stu-performance
         </div>
      </div>

    </>
  );
}
