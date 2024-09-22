"use server";

import { revalidatePath } from "next/cache";
import { studentCreateSchema, studentPatchSchema } from "../validations/student";
import {  Role } from "@prisma/client";
import { z } from "zod";

import { DatabaseError } from "../error";
import { handleActionError, withAuth } from "../withAuth";
import { getStudent, getStudentsForSchoolOld, postStudent, updateStudent } from "@/services/service-student";

type StudentCreateInput = z.infer<typeof studentCreateSchema>;
type StudentPatchInput = z.infer<typeof studentPatchSchema>;

const studentCreateAction = async (formData: StudentCreateInput) => {
  try {
    const validatedData = studentCreateSchema.parse(formData);
    const { yearGradeLevelId, ...studentData } = validatedData;
    const createdStudent = await postStudent(studentData, yearGradeLevelId);
    revalidatePath("/student");
    return { success: true, data: createdStudent };
  } catch (error) {
    console.log('Error in studentCreate:', { error });
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
          message: 'An error occurred while creating the student.',
          details: error.details
        }
      };
    }
    return {
      success: false,
      error: {
        type: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.'
      }
    };
  }
};

const studentPatchAction = async (formData: StudentPatchInput) => {
  try {
    const validatedData = studentPatchSchema.parse(formData);
    const updatedStudent = await updateStudent(validatedData.id, validatedData);

    revalidatePath("/students");
    return { success: true, data: updatedStudent };
  } catch (error) {
    console.log(JSON.stringify(error));
    console.log('Error in studentPatch:', { error });

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

const studentGetAction = async (studentId: string) => {
  try {
    const student = await getStudent(studentId);
    if (!student) {
      return { success: false, error: 'Student not found' };
    }
    revalidatePath(`/students/${studentId}`);
    return { success: true, data: student };
  } catch (error) {
    console.error('Error fetching student:', error);
    return { success: false, error: 'Failed to fetch student' };
  }
};

const studentsGetAction = async (schoolId: string) => {
  try {
    const students = await getStudentsForSchoolOld(schoolId);
    revalidatePath('/students');
    return { success: true, data: students };
  } catch (error) {
    console.error('Error fetching students:', error);
    return { success: false, error: 'Failed to fetch students' };
  }
};


export const studentsGet = withAuth(studentsGetAction, [Role.ADMIN, Role.PRINCIPAL]);
export const studentGet = withAuth(studentGetAction, [Role.ADMIN, Role.PRINCIPAL, Role.TEACHER, Role.STUDENT]);
export const studentPatch  = withAuth(studentPatchAction,[Role.ADMIN, Role.TEACHER, Role.PRINCIPAL]);
export const studentCreate = withAuth(studentCreateAction, [Role.ADMIN, Role.TEACHER, Role.PRINCIPAL]);
