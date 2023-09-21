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
                currentGrade: true,
                nationality: true,
                ssn: true,
                email: true,
                phone: true,
                address: true,
              }
        }
        );
        return students;
      } catch (error) {
       throw new Error(`Error getting all students: ${error.message}`);
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
  let dob = new Date(student.birthDate);
    try {
        const newStudent = await prisma.student.create({
          data: {
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            birthDate: dob,
            gender: student.gender,
            address: student.address,
            phone: student.phone,
            email: student.email,
        },
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
      console.log(`Error updating student inside service-student: ${error.message}`)
      throw new Error(`Error updating student: ${error.message}`);
    }
  };
