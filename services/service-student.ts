import prisma from "@/lib/db"
import { DatabaseError, ValidationError } from "@/lib/error";
import { studentCreateSchema, StudentPatchInput } from "@/lib/validations/student";

import logger from "@/logger";
import { Prisma, Student } from '@prisma/client';
import { z } from "zod";

export const getStudents = async () => {
    try {
        const students = await prisma.student.findMany(
        {
          select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
              birthDate: true,
              gender: true,
              enrollmentStatus: true,
              email: true,
              phone: true,
              address: true,
              yearGradeLevelId:true

            },
        });
        return students;
      } catch (error) {
       throw new Error(`Error getting students: ${error.message}`);
      }
}

export const getStudentsForSchoolOld = async(schoolId: string) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        schoolId: schoolId
      }
    })
    if (students) {
      return students;
    } else {
      return null;
    }
  } catch (error){
    logger.warn(`failed to read students for school: ${schoolId}`)
  }
}


export async function getStudent(studentId: string): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        yearGradeLevel: {
          select: {
            levelName: true,
            levelCategory: true,
            levelOrder: true,
          }
        },
        guardians: true
      }
    });

    if (!student) return null;
    // why are we doing this?
    return {
      ...student,
      levelName: student.yearGradeLevel?.levelName ?? 'Not Assigned',
      levelCategory: student.yearGradeLevel?.levelCategory ?? 'Not Assigned'
    };

  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw new Error('Failed to fetch student');
  }
}

export async function getStudentsForSchool(schoolId: string) {
  try {
    const students = await prisma.student.findMany({
      where: { schoolId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        enrollmentStatus: true,
        yearGradeLevel: {
          select: {
            levelName: true
          }
        }
      },
    });

    return students.map(student => ({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      enrollmentStatus: student.enrollmentStatus,
      levelName: student.yearGradeLevel?.levelName ?? 'Not Assigned'
    }));

  } catch (error) {
    console.error('Error fetching students with grade:', error);
    throw new Error('Failed to fetch students');
  }
}


type CreateStudentInput = z.infer<typeof studentCreateSchema>;

export const postStudent = async (
  student: Omit<CreateStudentInput, 'yearGradeLevelId'>,
  yearGradeLevelId: string
): Promise<Student> => {
  try {
    return await prisma.$transaction(async (tx) => {
      return tx.student.create({
        data: {
          ...student,
          birthDate: new Date(student.birthDate), // Convert string to Date if necessary
          yearGradeLevel: {
            connect: { id: yearGradeLevelId },
          },
          guardians: {
            connect: student.guardians?.map(id => ({ id })) || []
          }
        },
      });
    });
  } catch (error) {
    logger.error('Error creating student', { error, studentData: student, yearGradeLevelId });

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ValidationError('A student with this information already exists.', { fields: error.meta?.target as string[] });
        case 'P2025':
          throw new ValidationError('The specified grade level or guardian does not exist.', { yearGradeLevelId, guardians: student.guardians });
        default:
          throw new DatabaseError('An error occurred while creating the student.', { errorCode: error.code });
      }
    }

    throw new DatabaseError('An unexpected error occurred while creating the student.');
  }
};

export async function updateStudent(
  id: string,
  data:  Omit<StudentPatchInput, 'id'>
): Promise<Student> {
  try {
    const updateData: Prisma.StudentUpdateInput = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      nationality: data.nationality,
      ssn: data.ssn,
      email: data.email,
      phone: data.phone,
      address: data.address,
      enrollmentStatus: data.enrollmentStatus,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      yearGradeLevel: data.yearGradeLevelId
        ? { connect: { id: data.yearGradeLevelId } }
        : undefined,
      guardians: data.guardians
        ? { set: data.guardians.map(guardianId => ({ id: guardianId })) }
        : undefined,
    };
    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        yearGradeLevel: true,
        guardians: true,
      },
    });

    return updatedStudent;
  } catch (error) {
    logger.error('Error updating student', { error, studentId: id, updateData: data });
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025':
          throw new ValidationError('Student not found', { studentId: id });
        case 'P2002':
          throw new ValidationError('Unique constraint violation', { field: error.meta?.target });
        case 'P2003':
          throw new ValidationError('Foreign key constraint violation', { field: error.meta?.field_name });
        default:
          throw new DatabaseError('An error occurred while updating the student', { errorCode: error.code });
      }
    }
    throw new DatabaseError('An unexpected error occurred while updating the student');
  }
}
