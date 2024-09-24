import prisma from "@/lib/db";
import { DatabaseError } from "@/lib/error";
import { ClassPeriodCreateInput } from "@/lib/validations/academics";
import { withAuth } from "@/lib/withAuth";
import { ClassPeriod, Role } from "@prisma/client";

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

export const createClassPeriod = async (
  gradeLevelId: string,
  departmentId: string,
  classPeriodData: Omit<ClassPeriodCreateInput, 'gradeLevelId' | 'departmentId'>
): Promise<ClassPeriod> => {
  try {
    // Convert HH:mm strings to Date objects
    const startTime = new Date(`1970-01-01T${classPeriodData.startTime}:00`);
    const endTime = new Date(`1970-01-01T${classPeriodData.endTime}:00`);

    // Create a new ClassPeriod in the database
    const createdClassPeriod = await prisma.classPeriod.create({
      data: {
        name: classPeriodData.name,
        classType: classPeriodData.classType,
        description: classPeriodData.description,
        startTime,
        endTime,
        gradeLevelId: gradeLevelId,
        departmentId: departmentId,
      },
    });
    return createdClassPeriod;
  } catch (error) {
    console.error(`Failed to add class period: ${error.message}${gradeLevelId ? ` for grade level: ${gradeLevelId}` : ''}`);
    throw new Error('Failed to add class period');
  }
};


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
