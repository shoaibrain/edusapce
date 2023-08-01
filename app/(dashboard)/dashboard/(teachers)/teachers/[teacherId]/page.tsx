import { notFound, redirect } from "next/navigation";
import { Student, Teacher, User } from "@prisma/client";
import prisma from "@/lib/db";
import Image from 'next/image'
 
async function getTeacher(teacherId: Teacher["id"]) {
  return await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    }
  });
}


interface TeacherPageProps {
  params: { studentId: string };
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const teacher = await getTeacher(params.studentId);
  if (!teacher) {
    notFound();
  }
  
  return (
    <>
      <h1>Teacher Profile Information Page</h1>
      <p> Teacher details along with contact points, and salary info, employment terms</p>
    </>
  );
  
}
