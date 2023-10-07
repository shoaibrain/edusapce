import prisma from "@/lib/db";

export const getClasses = async () => {
  try {
    const classes = await prisma.classPeriod.findMany({
      select: {
        id: true,
        name: true,
        capacity: true,
        department: true,
        description: true,
        gradeLevel: true,
      },
    });
    return classes;
  } catch (error) {
    throw new Error(`Error getting all classes: ${error.message}`);
  }
}

export const getClass = async (classId: string) => {
  try {
    const classData = await prisma.classPeriod.findUnique({
      where: {
        id: classId,
      },
      select: {
        name: true,
        capacity: true,
        department: true,
        description: true,
        startTime: true,
        endTime: true,
        gradeLevel: true,
        teachers: true,
      },
    })
    if (!classData) {
      throw new Error(`Class with id: ${classId} not found`);
    }
    return classData;
  } catch (error) {
    throw new Error(`Error getting class: ${error.message}`);
  }
}

export const postClass = async (classData) => {
  try {
    const newClass = await prisma.classPeriod.create({
      data: classData,
    })
    return newClass;
  } catch (error) {
    throw new Error(`Error creating class: ${error.message}`);
  }
}

export const deleteClass = async (classId: string) => {
  try {
    await prisma.classPeriod.delete({
      where: {
        id: classId,
      },
    })
    return { ok: true };
  } catch (error) {
    throw new Error(`Error deleting class: ${error.message}`);
  }
}

export const patchClass = async (classId: string, classData) => {
  try {
    const updatedClass = await prisma.classPeriod.update({
      where: {
        id: classId,
      },
      data: classData,
    })
    return updatedClass;
  } catch (error) {
    throw new Error(`Error updating class: ${error.message}`);
  }
}
