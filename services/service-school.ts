import prisma from "@/lib/db"
import { DatabaseError } from "@/lib/error";
import { EmployeeCreateInput, EmployeePatchInput } from "@/lib/validations/employee";
import { SchoolCreateInput } from "@/lib/validations/school";
import { withAuth } from "@/lib/withAuth";
import { DepartmentEnum } from "@/types/department";
import { Employee, Prisma, Role, YearGradeLevel } from "@prisma/client";

type YearGradeLevelWithStudentCount = {
  id: string;
  levelName: string;
  description: string | null;
  levelCategory: string;
  levelOrder: number;
  capacity: number | null;
  classRoom: string | null;
  studentCount: number | null;
};


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
    console.log(`Grade Level added for school ${schoolId}`)
    return createdGradeLevel;
  } catch (error) {
    // Handle errors appropriately
    console.log(`Failed to add grade levels: ${error.message} for school : ${schoolId}`);
    throw new Error('Failed to add grade levels');
  }
};

export const addNewSchoolDepartments = async (schoolId: string, departments: DepartmentEnum[]) => {
  try {
    const result = await prisma.$transaction(
      departments.map(department =>
        prisma.department.create({
          data: {
            schoolId,
            name: department,
          },
        })
      )
    );
    return result;
  } catch (error) {
    console.error("Error adding new departments:", error);
    throw new Error(`Failed to create departments: ${error.message}`);
  }
};

export const createEmployee = async(
  tenantId: string,
  schoolId: string,
  employeeData: Omit<EmployeeCreateInput, 'tenantId' | 'schoolId'>
): Promise<Employee> => {

  try {
    if (!tenantId || !schoolId) {
      throw new Error("Tenant ID and School ID are required.");
    }
    const createdEmployee = await prisma.employee.create({
      data: {
        tenantId,
        schoolId,
        ...employeeData,
      },
    });
    return createdEmployee;
  } catch (error) {
    console.error("Error creating employee: ", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // P2002 is the unique constraint violation error code
        throw new Error("An employee with this email already exists.");
      }
    }
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred while creating the employee."
    );
  }
}

export const updateEmployee = async (
  employeeId: string,
  updateData: Omit<EmployeePatchInput, 'employeeId'>
): Promise<Employee> => {
  try {
    if (!employeeId) {
      throw new Error("Employee ID is required for updating.");
    }
    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });
    return updatedEmployee;
  } catch (error) {
    console.error("Error updating employee: ", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // P2025 is the record not found error
        throw new Error("Employee not found.");
      }
    }
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred while updating the employee."
    );
  }
};

export const getSchoolDepartments = async (schoolId: string) => {
  try {
    const result = await prisma.department.findMany({
      where: {
        schoolId: schoolId,
      },
      select: {
        id:true,
        name: true
      }
    });
    return result;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error(`Failed to fetch departments for schoolId ${schoolId}: ${error.message}`);
  }
};




const YearGradeLevelWithStudentCount = async (
  schoolId: string
): Promise<YearGradeLevelWithStudentCount[]> => {
  try {
    const gradeLevels = await prisma.yearGradeLevel.findMany({
      where: { schoolId },
      select: {
        id: true,
        levelName: true,
        description: true,
        levelCategory: true,
        levelOrder: true,
        capacity: true,
        classRoom: true,
        _count: { select: { students: true } },
      },
    });

    return gradeLevels.map((gradeLevel) => ({
      ...gradeLevel,
      studentCount: gradeLevel._count.students,
    }));
  } catch (error) {
    console.log(`Error retrieving grade levels: ${error.message}`, { schoolId, error });
    throw new DatabaseError(`Failed to get grade levels`, { schoolId });
  }
};

export const getGradeLevelsForSchool = withAuth(
  YearGradeLevelWithStudentCount,
  [Role.ADMIN, Role.PRINCIPAL, Role.TEACHER]
);

export const patchGradeLevel = async (
  schoolId: string,
  gradeLevelPatchData: any,
):Promise<void> => {

  try{

    console.log(`Successfully patched grade level for school ${schoolId}`);
  } catch(error) {
    console.log(`Failed to patch grade levels: ${error.message}`);
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

    console.log(`Successfully added students to grade level for school ${schoolId}`);
  } catch (error) {
    console.log(`Error adding students to grade level: ${error.message}`);
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

export const postSchool = async (school: SchoolCreateInput) => {
  try {
    const newSchool = await prisma.school.create({
      data: school,
    });
    return newSchool;
  } catch (error) {
    console.error(`Error creating school: ${error.message}`);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      throw new DatabaseError(`A school with this ${field} already exists`);
    }
    throw new DatabaseError('Failed to create school');
  }
};

export const deleteSchool = async (schoolId: string) => {
    try {
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
