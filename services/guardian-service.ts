
import prisma from "@/lib/db"

export const getAllGuardians = async () => {
    try {
        const guardians = await prisma.guardian.findMany();
        return guardians;
      } catch (error) {
       throw new Error(`Error getting all guardians: ${error.message}`);
      }

}

export const createGuardian = async (data: any) => {
    try {
        const guardian = await prisma.guardian.create({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              address: data.address,
              email: data.email,
              profession: data.profession,
              annualIncome: data.annualIncome,
              guardianType: data.guardianType,
              businessAddress: data.businessAddress,
            },
          })
          return guardian;
    } catch (error) {
        throw new Error(`Error creating guardian: ${error.message}`);
    }
}