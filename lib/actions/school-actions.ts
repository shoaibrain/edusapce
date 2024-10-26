"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {  Role } from "@prisma/client";

import {  addGradeLevels as addGradeLevel, addNewSchoolDepartments, postSchool, updateSchool } from "@/services/service-school";

import { withAuth, handleActionError } from "../withAuth";

import {  DatabaseError, ValidationError } from "../error";
import { z } from "zod";
import { YearGradeLevelCreateInput, YearGradeLevelCreateSchema } from "../validations/academics";
import { DepartmentCreateInput, departmentCreateSchema, SchoolCreateInput, schoolCreateSchema, SchoolUpdateInput, schoolUpdateSchema } from "../validations/school";

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
export const yearGradeLevelCreate = withAuth(async (formData: YearGradeLevelCreateInput) => {
  try {

    const validatedData = YearGradeLevelCreateSchema.parse(formData);
    const { schoolId, ...gradeLevelData } = validatedData;
    const createdGradeLevel = await addGradeLevel(schoolId, gradeLevelData);
    revalidatePath("/school");
    return {
      success: true,
      message: "Grade level created successfully",
      data: createdGradeLevel
    };
  } catch (error) {
    console.error("Error creating YearGradeLevel", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}, [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);

export const schoolDepartmentCreate = withAuth(async (data: DepartmentCreateInput) => {
  try{
    const validatedData = departmentCreateSchema.parse(data);
    const { schoolId, departments } = validatedData;
    const createdDepartment = await addNewSchoolDepartments(schoolId, departments);
    revalidatePath("/school");
    return {
      success: true,
      message: "School Department created successfully",
      data: createdDepartment
    };
  } catch (error) {
      console.error("Error creating Department", error);
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: "Validation failed",
          errors: error.errors,
        };
      }
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      };
  }
},[Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);

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
): Promise<{ message: string; success:boolean, guardianMetrics?: GuardianMetrics }> {
  try {
    // Simulate retrieving guardian data
    const guardianMetrics: GuardianMetrics = {
      averageCommunicationFrequency: Math.random() * 4, // Random between 0-4 for communication frequency
      averageVolunteerRate: Math.random() * 50, // Random between 0-50% for volunteer rate
      meetingAttendanceRate: Math.random() * 80, // Random between 0-80% for meeting attendance rate
    };
    return { message: 'School guardian overview retrieved successfully', success:true, guardianMetrics };
  } catch (error) {
    console.error('Error fetching school guardian overview data:', error);
    return { message: 'Failed to retrieve school guardian overview data', success:false };
  }
}
// Interface for guardian metrics
interface GuardianMetrics {
  averageCommunicationFrequency: number; // Average communication frequency (monthly)
  averageVolunteerRate: number; // Percentage of guardians volunteering
  meetingAttendanceRate: number; // Percentage of guardians attending meetings
}

// export async function getSchoolAcademicDetails(
//   schoolId: string
// ): Promise<{ message: string; schoolAcademics?: SchoolAcademics }> {
//   try {
//     const gradeLevels = await prisma.yearGradeLevel.findMany({
//       where: {
//         schoolId: schoolId,
//       },
//       select: {
//         id: true,
//         levelName: true,
//         description: true,
//         levelCategory: true,
//         levelOrder: true,
//         capacity: true,
//         classRoom: true,
//       },
//     });

//     return {
//       message: "success",
//       data:gradeLevels
//     }
//   } catch (error) {
//     console.error('Error fetching school academic data:', error);
//     return { message: 'Failed to retrieve school academic data' };
//   }
// }

interface SchoolAcademics {
  id: string,
  name: string,
  description: string,
  levelCategory: string,
  levelOrder: number,
  capacity: number,
  classRoom: string,
}

const schoolCreateAction = async (
  formData: SchoolCreateInput
): Promise<{
  success: boolean;
  data?: any;
  error?: { message: string; field?: string };
}> => {
  try {
    const parseResult = schoolCreateSchema.safeParse(formData);
    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.errors[0].message);
    }
    const createdSchool = await postSchool(parseResult.data);
    revalidatePath("/school");
    console.log('School created successfully', { schoolId: createdSchool.id });
    return { success: true, data: createdSchool };
  } catch (error) {
    console.log('Error in schoolCreate:', { error });
    return handleActionError(error);
  }
};
export const schoolCreate = withAuth(schoolCreateAction, [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);

const schoolUpdateAction = async(
  formData: SchoolUpdateInput ) => {
  try {
    const validatedData = schoolUpdateSchema.parse(formData);
    const id = validatedData.id; // school id
    const tenantId = validatedData.tenantId;
    const updatedSchool = await updateSchool(
      id,
      tenantId,
      validatedData);
    revalidatePath(`/school/${validatedData.id}`);
    revalidatePath(`/schools`);
    return {
      success: true,
      data: updatedSchool
    }
  } catch (error) {
    console.log(`Error in School patchh action:`, error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          type: 'VALIDATION_ERROR',
          message: 'Invalid student data',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        }
      };
    }
    if (error instanceof DatabaseError) {
      return {
        success: false,
        error: {
          type: 'DATABASE_ERROR',
          message: 'An error occurred while updating the student.',
          details: error.details
        }
      };
    }
    return handleActionError(error);
  }
};
export const schoolUpdate = withAuth(schoolUpdateAction, [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);
