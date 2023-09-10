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
                nagriktaNumber: true,
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
      console.log(JSON.stringify(student));
        return student;
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
        console.log(JSON.stringify(deletedStudent));
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
export const addGuardianForStudent = async (studentId: string, guardian:any) => {
    try {
        const newGuardian = await prisma.guardian.create({
            data: {
                firstName: guardian.firstName,
                lastName: guardian.lastName,
                address: guardian.address,
                phone: guardian.phone,
                email: guardian.email,
                profession: guardian.profession,
                annualIncome: guardian.annualIncome,
                guardianType: guardian.guardianType,
                students: {
                    connect: {
                        id: studentId,
                    },
                },
            },
        })
        console.log('New guardian created:', newGuardian);
    } catch(error) {
        throw new Error(`Error adding guardian: ${error.message}`);
    }
}