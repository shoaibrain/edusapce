import prisma from "@/lib/db";
import * as z from "zod"

const guardianCreateSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string().email().optional(),
    profession: z.string(),
    annualIncome: z.string().optional(),
    guardianType: z.string(),
    });
    
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