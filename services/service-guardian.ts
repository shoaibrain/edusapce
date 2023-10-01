import prisma from "@/lib/db";

export const getGuardians = async () => {
    try {
        const guardians = await prisma.guardian.findMany(
        {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                profession: true,
                annualIncome: true,
                guardianType: true,
              }
        }
        );
        return guardians;
      } catch (error) {
       throw new Error(`Error getting all students: ${error.message}`);
      }
}

export const getGuardian = async(guardianId : string) => {
    try{
    const guardian =  await prisma.guardian.findUnique({
        where: {
          id: guardianId,
        },
        include:{
            students: true,
        }
      })
      if (!guardian) {
        throw new Error(`Guardian with id: ${guardianId} not found`);
      }
    return guardian;
    } catch (error) {
        throw new Error(`Error getting student: ${error.message}`);
    }
}

export const postGuardian = async (guardian) => {
    try {
        const newGuardian = await prisma.guardian.create({
            data: guardian,
          })
        return newGuardian;
      } catch (error) {
       throw new Error(`Error creating student: ${error.message}`);
      }
}

export const deleteGuardian = async (guardianId: string) => {
    try {
        const deletedGuardian = await prisma.guardian.delete({
            where: {
              id: guardianId,
            },
          })
        return deletedGuardian;
      } catch (error) {
       throw new Error(`Error deleting student: ${error.message}`);
      }
}

export const patchGuardian = async (guardianId: string, guardian) => {
  console.log(`Guardian data: ${JSON.stringify(guardian)}`)
    try {
        const updatedGuardian = await prisma.guardian.update({
            where: {
              id: guardianId,
            },
            data: guardian,
          })
        return updatedGuardian;
      } catch (error) {
        console.log(`Error updating student: ${error.message}`)
       throw new Error(`Error updating student: ${error.message}`);
      }
}
