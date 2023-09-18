import prisma from "@/lib/db";

export const getClasses = async () => {
  try {
    const classes = await prisma.cLASS_LEVEL.findMany(
    {
        select: {
            id: true,
            name: true,
          }
    }
    );
    if (!classes) throw new Error("No classes found");
    return classes;
  } catch (error ) {
    throw new Error(`Error getting all classes: ${error.message}`);
  }
}
export const getClass = async(classId : string) => {
  try {
    const classObj = await prisma.cLASS_LEVEL.findUnique({
        where: {
          id: classId,
        },
        include:{
            students: true,
            teachers: true,
        }
      })
    return classObj;
  } catch(error) {
    throw new Error(`Error getting class: ${error.message}`);
  }
}
export const postClass = async (classObj) => {
  try {
    const newClass = await prisma.cLASS_LEVEL.create({
        data: classObj,
      })
    return newClass;
  } catch (error) {
    throw new Error(`Error creating class: ${error.message}`);
  }
}
export const deleteClass = async (classId: string) => {
  try {
    const deletedClass = await prisma.cLASS_LEVEL.delete({
        where: {
            id: classId,
        }
      })
    return deletedClass;
  } catch (error) {
    throw new Error(`Error deleting class: ${error.message}`);
  }
}
export const patchClass = async (classId: string, classObj) => {
  try {
    const updatedClass = await prisma.cLASS_LEVEL.update({
        where: {
            id: classId,
        },
        data: classObj,
      })
    return updatedClass;
  } catch (error) {
    throw new Error(`Error updating class: ${error.message}`);
  }
}
