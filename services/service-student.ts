import prisma from "@/lib/db"
import { logger } from "@/logger";

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
      },
      include: {
        gradeLevels: {
          include: {
            gradeLevel: true,
          },
          orderBy: {
            enrolledAt: 'desc',
          },
          take: 1, // Get only the most recent grade level
        },
      },
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
              gradeLevels: {
                include: {
                  gradeLevel: true,
                },
                orderBy: {
                  enrolledAt: 'desc',
                },
                take: 1, // Get only the most recent grade level
              },
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
        data: student,
      });

      // Create the StudentYearGradeLevel record
      const createdStudentYearGradeLevel = await tx.studentYearGradeLevel.create({
        data: {
          student_id: createdStudent.id,
          grade_level_id: gradeLevelId,
        },
      });

      // Connect the student and the StudentYearGradeLevel records
      const updatedStudent = await tx.student.update({
        where: { id: createdStudent.id },
        data: {
          gradeLevels: {
            connect: { id: createdStudentYearGradeLevel.id },
          },
        },
      });

      return updatedStudent;
    });

    return newStudent;
  } catch (error) {
    console.log(`Error creating student: ${error.message}`);
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
