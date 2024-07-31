"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {  YearGradeLevel } from "@prisma/client";
import { YearGradeLevelCreateSchema } from "../validations/academics";
import { SchoolCreateInput, schoolCreateSchema } from "../validations/school";
import { postSchool } from "@/services/service-school";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UnauthorizedError, ValidationError, AppError } from '../errors';

export interface SchoolOverview {
  student_count: string,
  employee_count: string,
  parent_count: string,
}
export interface StudentMetrics {
  averageAttendanceRate: number;
  averageGrade: number;
  graduationRate?: number;
  collegeEnrollmentRate?: number;
  disciplinaryActionsCount?: number;
  clubsParticipationRate?: number;
  absenteeRate?: number;
  suspensionRate?: number;
}


export async function yearGradeLevelCreate(
  formData: any
): Promise<{ message: string; createdYearGradeLevel?: YearGradeLevel }> {
  try {
    const createData = YearGradeLevelCreateSchema.safeParse(formData);
    if (!createData.success) {
      throw new Error("Invalid create data");
    }
    const {
      schoolId,
      name,
      description,
      levelCategory,
      levelOrder,
      capacity,
      classRoom,
    } = createData.data;

    const createdYearGradeLevel = await prisma.yearGradeLevel.create({
      data: {
        schoolId,
        name,
        description,
        levelCategory,
        levelOrder,
        capacity,
        classRoom,
      },
    });
    // Associate the newly created YearGradeLevel with the School
    await prisma.school.update({
      where: { id: schoolId },
      data: {
        yearGradeLevels: {
          connect: { id: createdYearGradeLevel.id },
        },
      },
    });
    revalidatePath("/school");
    return { message: "ok", createdYearGradeLevel };
  } catch (error) {
    console.error(error);
    console.log(`Error while creating YearGradeLevel. Error:${error.message}`)
    return { message: "Failed to create new grade level." };
  }
}

export async function getSchoolOverviewData(
  schoolId: string
  ): Promise<{
      message: string;
      schoolOverview?: SchoolOverview }>
    {
  try {
    const [studentsCount, employeesCount, guardiansCount] = await prisma.$transaction([
      prisma.student.count({
        where: { schoolId },
      }),
      prisma.employee.count({
        where: { schoolId },
      }),
      prisma.guardian.count({
        where: { schoolId },
      }),
    ]);
    const schoolOverview: SchoolOverview = {
      student_count: studentsCount.toString(),
      employee_count: employeesCount.toString(),
      parent_count: guardiansCount.toString(),
    };
    return { message: 'School overview retrieved successfully', schoolOverview };
  } catch (error) {
    console.error('Error fetching school overview data:', error);
    return { message: 'Failed to retrieve school overview data' };
  }
}
export async function getSchoolStudentOverviewData(
  schoolId: string
  ): Promise<{
      message: string;
      studentMetrics?: StudentMetrics }>
    {
  try {
    const studentMetrics: StudentMetrics = {
      averageAttendanceRate: parseFloat((Math.random() * 100).toFixed(2)),
      averageGrade: (Math.random() * 4) + 1,
      graduationRate: parseFloat((Math.random() * 100).toFixed(2)),
      collegeEnrollmentRate: parseFloat((Math.random() * 100).toFixed(2)),
      disciplinaryActionsCount: Math.floor(Math.random() * 10),
      clubsParticipationRate: parseFloat((Math.random() * 100).toFixed(2)),
      absenteeRate: parseFloat((Math.random() * 15).toFixed(2)),
      suspensionRate: parseFloat((Math.random() * 20).toFixed(2)),
    };
    return { message: 'Student overview retrieved successfully', studentMetrics };

  } catch (error) {
    console.error('Error fetching Student overview data:', error);
    return { message: 'Failed to retrieve student overview data' };
  }
}
export async function getSchoolGuardianOverviewData(
  schoolId: string
): Promise<{ message: string; guardianMetrics?: GuardianMetrics }> {
  try {
    // Simulate retrieving guardian data
    const guardianMetrics: GuardianMetrics = {
      averageCommunicationFrequency: Math.random() * 4, // Random between 0-4 for communication frequency
      averageVolunteerRate: Math.random() * 50, // Random between 0-50% for volunteer rate
      meetingAttendanceRate: Math.random() * 80, // Random between 0-80% for meeting attendance rate
    };
    return { message: 'School guardian overview retrieved successfully', guardianMetrics };
  } catch (error) {
    console.error('Error fetching school guardian overview data:', error);
    return { message: 'Failed to retrieve school guardian overview data' };
  }
}
// Interface for guardian metrics
interface GuardianMetrics {
  averageCommunicationFrequency: number; // Average communication frequency (monthly)
  averageVolunteerRate: number; // Percentage of guardians volunteering
  meetingAttendanceRate: number; // Percentage of guardians attending meetings
}

export async function getSchoolAcademicDetails(
  schoolId: string
): Promise<{ message: string; schoolAcademics?: SchoolAcademics }> {
  try {
    const gradeLevels = await prisma.yearGradeLevel.findMany({
      where: {
        schoolId: schoolId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        levelCategory: true,
        levelOrder: true,
        capacity: true,
        classRoom: true,
      },
    });
    //@ts-ignore
    return {message:"school grade level data retrieved successfully", gradeLevels}
  } catch (error) {
    console.error('Error fetching school academic data:', error);
    return { message: 'Failed to retrieve school academic data' };
  }
}
interface SchoolAcademics {
  id: string,
  name: string,
  description: string,
  levelCategory: string,
  levelOrder: number,
  capacity: number,
  classRoom: string,
}


export async function schoolCreate(
  formData: SchoolCreateInput
): Promise<{
  success: boolean;
  data?: any;
  error?: { message: string; field?: string };
}> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedError();
    }
    const parseResult = schoolCreateSchema.safeParse(formData);
    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.errors[0].message);
    }
    const createdSchool = await postSchool(parseResult.data);
    revalidatePath("/school");
    return { success: true, data: createdSchool };
  } catch (error) {
    console.error('Error in schoolCreate:', error);
    if (error instanceof AppError) {
      return {
        success: false,
        error: {
          message: error.message,
          field: error instanceof ValidationError ? "field" : undefined
        },
      };
    }
    return {
      success: false,
      error: { message: 'An unexpected error occurred' },
    };
  }
}
