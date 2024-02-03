import prisma from "@/lib/db"
import { Prisma, YearGradeLevel } from "@prisma/client";
import { logger } from "@/logger";
import { gradeLevelPatchSchema } from "@/lib/validations/academics";



export const addGradeLevels = async (
  schoolId: string,
  // assuing data coming to service layer should always be type safe
  gradeLevelData: any,
): Promise<YearGradeLevel> => {
  try {
    // 1. Create a new YearGradeLevel in the database
    const createdGradeLevel = await prisma.yearGradeLevel.create({
      data: {
        ...gradeLevelData,
        schoolId: schoolId,
      },
    });
    // 2. Associate the newly created YearGradeLevel with the School
    await prisma.school.update({
      where: { id: schoolId },
      data: {
        yearGradeLevels: {
          connect: { id: createdGradeLevel.id },
        },
      },
    });
    logger.info(`Grade Level added for school ${schoolId}`)
    return createdGradeLevel;
  } catch (error) {
    // Handle errors appropriately
    logger.warn(`Failed to add grade levels: ${error.message} for school : ${schoolId}`);
    throw new Error('Failed to add grade levels');
  }
};


export const patchGradeLevel = async (
  schoolId: string,
  gradeLevelPatchData: any,
):Promise<void> => {

  try{

        logger.info(`Successfully patched grade level for school ${schoolId}`);
  } catch(error) {
    logger.warn(`Failed to patch grade levels: ${error.message}`);
    throw new Error('Failed to add grade levels');
  }
}


export const addStudentsToGradeLevel = async (
  schoolId: string,
  gradeLevelName: string,
  studentsData: { student_id: string }[],
): Promise<void> => {
  try {
    console.log(`schoolId: ${schoolId}`)

    logger.info(`Successfully added students to grade level for school ${schoolId}`);
  } catch (error) {
    logger.error(`Error adding students to grade level: ${error.message}`);
    throw new Error("Failed to add students to grade level");
  }
};



export const getSchools = async () => {
    try {
      const schools = await prisma.school.findMany();
      return schools;
    } catch (error) {
      throw new Error(`Error getting schools: ${error.message}`);
      }
}

export const getSchoolsByTenant = async (tenantId: string) => {
  try {
    const schools = await prisma.school.findMany({
      where: {
        tenantId: tenantId,
      },
    });
    return schools;
  } catch (error) {
    throw new Error(`Error getting schools: ${error.message}`);
    }
}

export const getSchool = async(schoolId : string) => {
    try{
        const school =  await prisma.school.findUnique({
          where: {
            id: schoolId,
          }
      })
      if (school) {
        return school;
      }
      return null;
    } catch (error) {
      throw new Error(`Error getting school: ${error.message}`);
    }
}

export const postSchool = async (school) => {
    console.log(`school: ${JSON.stringify(school)}`)
    try {
          const newSchool = await prisma.school.create({
            data: school,
          });
          return newSchool;
      } catch (error) {
        console.log(`Error creating school: ${error.message}`)
       throw new Error(`Error creating school: ${error.message}`);
      }
}

export const deleteSchool = async (schoolId: string) => {
    try {
      // TODO: soft delete
        const deletedSchool = await prisma.school.delete({
            where: {
                id: schoolId,
            }
        })
        return deletedSchool;
      } catch (error) {
       throw new Error(`Error deleting school: ${error.message}`);
      }
}
export const patchSchoolProfile = async (schoolId: string, schoolUpdates) => {
    try {
      const patchedSchool = await prisma.school.update({
        where: {
          id: schoolId,
        },
        data: schoolUpdates,
      });
      return patchedSchool;
    } catch (error) {
      throw new Error(`Error patching school: ${error.message}`);
    }
}
