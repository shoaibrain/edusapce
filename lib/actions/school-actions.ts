"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {  YearGradeLevel } from "@prisma/client";
import { YearGradeLevelCreateSchema } from "../validations/academics";

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
    // Simulate retrieving guardian data (replace with actual data retrieval logic)
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
  // Add other relevant guardian metrics here (e.g., satisfaction surveys)
}
