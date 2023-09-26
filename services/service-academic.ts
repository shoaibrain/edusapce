import prisma from "@/lib/db";

export const getClassPeriods = async () => {
  const classPeriods = await prisma.cLASS_PERIOD.findMany({
    select:{
      id: true,
      name: true,
      startTime: true,
      endTime: true
    }
  });
  return classPeriods;
}

export const getClassPeriod = async (classPeriodId: string) => {
  try {
    const classPeriod = await prisma.cLASS_PERIOD.findUnique({
      where: {
        id: classPeriodId,
      },
      select:{
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        teacherId: true,
        classId: true,
        employeeId: true,
      }
  });
  if (!classPeriod) {
    throw new Error(`ClassPeriod with id: ${classPeriodId} not found`);
  }
  return classPeriod;
} catch (error) {
    throw new Error(`Error getting classPeriod: ${error.message}`);
}
}
export const postClassPeriod = async (classPeriod) => {
  try {
    const newClassPeriod = await prisma.cLASS_PERIOD.create({
      data: classPeriod,
    })
    if (!newClassPeriod) {
      console.log(`Error creating classPeriod: ${classPeriod}`)
      throw new Error(`Error creating classPeriod: ${classPeriod}`)
    }
    return newClassPeriod;
  } catch (error) {
    console.log(`Error creating classPeriod: ${error.message}`)
    throw new Error(`Error creating classPeriod: ${error.message}`);
  }
}
export const deleteClassPeriod = async (classPeriodId: string) => {
  try {
    const deletedClassPeriod = await prisma.cLASS_PERIOD.delete({
      where: {
        id: classPeriodId,
      },
    })
    return deletedClassPeriod;
  } catch (error) {
    throw new Error(`Error deleting classPeriod: ${error.message}`);
  }
}
export const patchClassPeriod = async (classPeriodId: string, classPeriod) => {
  try {
    const updatedClassPeriod = await prisma.cLASS_PERIOD.update({
      where: {
        id: classPeriodId,
      },
      data: classPeriod,
    })
    return updatedClassPeriod;
  } catch (error) {
    throw new Error(`Error updating classPeriod: ${error.message}`);
  }
}
export const getGradeLevels = async () => {
  const gradeLevels = await prisma.gRADE_LEVEL.findMany({
    select:{
      id: true,
      name: true,
      levelOrder: true,
      description: true,
    }
  });
  return gradeLevels;
}

export const getGradeLevel = async (gradeLevelId: string) => {
  try {
    const gradeLevel = await prisma.gRADE_LEVEL.findUnique({
      where: {
        id: gradeLevelId,
      },
      select:{
        id: true,
        name: true,
        levelOrder: true,
        description: true,
        teachers: true,
        students: true,
        classPeriods: true,
      }

  });
  if (!gradeLevel) {
    throw new Error(`GradeLevel with id: ${gradeLevelId} not found`);
  }
  return gradeLevel;
} catch (error) {
    throw new Error(`Error getting gradeLevel: ${error.message}`);
}
}
export const postGradeLevel = async (gradeLevel) => {
  try {
    const newGradeLevel = await prisma.gRADE_LEVEL.create({
      data: gradeLevel,
    })
    return newGradeLevel;
  } catch (error) {
    console.log(`Error creating gradeLevel: ${error.message}`)
    throw new Error(`Error creating gradeLevel: ${error.message}`);
  }
}
export const deleteGradeLevel = async (gradeLevelId: string) => {
  try {
    const deletedGradeLevel = await prisma.gRADE_LEVEL.delete({
      where: {
        id: gradeLevelId,
      },
    })
    return deletedGradeLevel;
  } catch (error) {
    throw new Error(`Error deleting gradeLevel: ${error.message}`);
  }
}
export const patchGradeLevel = async (gradeLevelId: string, gradeLevelUpdates) => {
  try {
    const updatedGradeLevel = await prisma.gRADE_LEVEL.update({
      where: {
        id: gradeLevelId,
      },
      data: gradeLevelUpdates,
    })
    return updatedGradeLevel;
  } catch (error) {
    throw new Error(`Error updating gradeLevel: ${error.message}`);
  }
}

