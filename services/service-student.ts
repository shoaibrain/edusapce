import prisma from "@/lib/db"
import { logger } from "@/logger";
import { Prisma } from '@prisma/client';

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

export const getStudentsForSchool = async(schoolId: string) => {
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
export const getStudent = async(studentId : string) => {
    try{
        const student =  await prisma.student.findUnique({
          where: {
            id: studentId,
          },
          include:{
              guardians: true,
              yearGradeLevel: true,
          }
      })
      if (student) {
        return student;
      }
      return null;
    } catch (error) {
      throw new Error(`Error getting student: ${error.message}`);
    }
}

export const postStudent = async (student, gradeLevelId: string) => {
  try {
    const newStudent = await prisma.$transaction(async (tx) => {
      // Create the new student
      const createdStudent = await tx.student.create({
        data: {
          ...student,
          yearGradeLevel: {
            connect: { id: gradeLevelId },
          },
        },
      });

      return createdStudent;
    });
    return newStudent;
  } catch (error) {
    logger.error(`Error creating student: ${error.message}`);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case 'P2002':
          throw new Error('A unique constraint violation occurred.');
        // Add more cases as needed for other error codes
        default:
          throw new Error('An unknown error occurred.');
      }
    }
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const deleteStudent = async (studentId: string) => {
    try {
        const deletedStudent = await prisma.student.delete({
            where: {
                id: studentId,
            }
        })
        return deletedStudent;
    } catch(error) {
        throw new Error(`Error deleting student: ${error.message}`);
    }

}
export const patchStudentProfile = async (studentId: string, studentUpdates) => {
    try {
      const patchedStudent = await prisma.student.update({
        where: {
          id: studentId,
        },
        data: studentUpdates,
      });
      return patchedStudent;
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  };

export const patchStudentEnrollmentn = async (
  studentId: string,
  schoolId: string,
  enrollmentUpdates) =>{
  try {
    const patchedStudent = await prisma.student.update({
      where: {
        id: studentId,
        schoolId:schoolId,
      },
      data:enrollmentUpdates
    });
    return patchedStudent;
    } catch( error ) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  }
