//@ts-nocheck
import prisma from "@/lib/db";
import { DatabaseError } from "@/lib/error";
import { ClassPeriodCreateInput } from "@/lib/validations/academics";
import { withAuth } from "@/lib/withAuth";
import { ClassPeriod, Role } from "@prisma/client";

export const createClassPeriod = async (
  gradeLevelId: string,
  departmentId: string,
  instructorId: string,
  classPeriodData: Omit<ClassPeriodCreateInput, 'gradeLevelId' | 'departmentId'| 'instructorId'>
): Promise<ClassPeriod> => {
  try {
    // Convert HH:mm strings to Date objects
    const startTime = new Date(`1970-01-01T${classPeriodData.startTime}:00`);
    const endTime = new Date(`1970-01-01T${classPeriodData.endTime}:00`);

    const createdClassPeriod = await prisma.classPeriod.create({
      data: {
        name: classPeriodData.name,
        classType: classPeriodData.classType,
        description: classPeriodData.description,
        startTime,
        endTime,
        gradeLevelId: gradeLevelId,
        departmentId: departmentId,
        instructorId: instructorId,
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
  [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]
);
