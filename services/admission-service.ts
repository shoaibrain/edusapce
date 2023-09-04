
import prisma from "@/lib/db"

export const getTotalAdmissions = async () => {
    try {
        const admissions = await prisma.student.findMany(); // a simple metrics, TODO: do better
        return admissions.length;
      } catch (error) {
       throw new Error(`Error getting all admissions: ${error.message}`);
      }

}