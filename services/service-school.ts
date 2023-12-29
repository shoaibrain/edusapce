/// @ts-nocheck

import prisma from "@/lib/db"

export const getSchools = async () => {
    try {
      const schools = await prisma.school.findMany();
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
    try {
      const schoolData = {
        name: school.name,
        address: school.address,
        phone: school.phone,
        email: school.email,
        website: school.website,
        users: school.users,
      };
      if (school.users && school.users.length > 0) {
        schoolData.users = {
          connect: school.users.map((userId) => ({ id: userId })),
        };
      }
        const newSchool = await prisma.school.create({
          data: schoolData,
      })
        return newSchool;
      } catch (error) {
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
export const patchSchool = async (schoolId: string, schoolUpdates) => {
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
