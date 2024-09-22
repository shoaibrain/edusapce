import prisma from "@/lib/db";
import { DatabaseError } from "@/lib/error";
import { ClassPeriodCreateSchema } from "@/lib/validations/academics";
import { withAuth } from "@/lib/withAuth";
import { Role } from "@prisma/client";
import { z } from "zod";


export const postYearGradeLevel = async (data:any) =>{
  try {
    const newYearGradeLevel = await prisma.yearGradeLevel.create({
      data,
    });
    return newYearGradeLevel;
  } catch(error) {
    throw new Error(`Error creating Year Grade Level: ${error.message}`);
  }
}


type ClassPeriodInput = z.infer<typeof ClassPeriodCreateSchema>;

async function createClassPeriod(data: ClassPeriodInput) {
  const { startTime, endTime, ...rest } = data;

  // Convert HH:mm strings to Date objects
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  const newClassPeriod = await prisma.classPeriod.create({
    data: {
      ...rest,
      startTime: start,
      endTime: end,
    },
  });

  return newClassPeriod;
}
export const createClassPeriodWithAuth = withAuth(
createClassPeriod,
  [Role.ADMIN, Role.PRINCIPAL, Role.TEACHER]
);

interface YearGradeLevelWithDetails {
  id: string;
  schoolId: string;
  levelName: string;
  description: string | null;
  levelCategory: string;
  levelOrder: number;
  capacity: number | null;
  classRoom: string | null;
  studentCount: number;
  classPeriods: {
    id: string;
    name: string;
    classType: string | null;
    department: string;
    description: string | null;
    startTime: Date;
    endTime: Date;
  }[];
}

const getYearGradeLevelById = async (
  id: string
): Promise<YearGradeLevelWithDetails | null> => {
  try {
    const yearGradeLevel = await prisma.yearGradeLevel.findUnique({
      where: { id },
      include: {
        students: {
          select: {
            id: true,
          },
        },
        classPeriods: {
          select: {
            id: true,
            name: true,
            classType: true,
            department: true,
            description: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    if (!yearGradeLevel) {
      return null;
    }

    const { students, classPeriods, ...yearGradeLevelData } = yearGradeLevel;

    return {
      ...yearGradeLevelData,
      studentCount: students.length,
      classPeriods: classPeriods,
    };
  } catch (error) {
    console.log(`Error retrieving year grade level: ${error.message}`, { id, error });
    throw new DatabaseError('Failed to get year grade level', { id });
  }
};

export const getYearGradeLevel = withAuth(
  getYearGradeLevelById,
  [Role.ADMIN, Role.PRINCIPAL, Role.TEACHER]
);
