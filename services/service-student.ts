import prisma from "@/lib/db"

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
                gradeLevel: true,
              },

        });
        return students;
      } catch (error) {
       throw new Error(`Error getting students: ${error.message}`);
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
              classGradeLevel: true,
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
export const postStudent = async (student) => {
    try {
        const newStudent = await prisma.student.create({
          data: student,
      })
        return newStudent;
      } catch (error) {
       throw new Error(`Error creating student: ${error.message}`);
      }
}
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
export const patchStudent = async (studentId: string, studentUpdates) => {
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
