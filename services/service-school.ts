
//@ts-nocheck
import prisma from "@/lib/db"
import { DatabaseError, NotFoundError, ValidationError } from "@/lib/error";
import { EmployeeCreateInput, EmployeePatchInput } from "@/lib/validations/employee";
import { SchoolCreateInput, SchoolUpdateInput } from "@/lib/validations/school";
import { withAuth } from "@/lib/withAuth";
import { DepartmentEnum } from "@/types/department";
import { Employee, Prisma, Role, School, YearGradeLevel } from "@prisma/client";

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
  id: string,
  updateData: Omit<EmployeePatchInput, 'id'>
): Promise<Employee> => {
  try {
    if (!employeeId) {
      throw new Error("Employee ID is required for updating.");
    }
    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
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

export const getSchoolInstructors = async(schoolId: string) => {
  try {
    const result = await prisma.employee.findMany({
      where: {
        schoolId: schoolId
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true
      }
    });
    return result;
  } catch (error) {
    console.error('Error fetching school instructors:', error);
    throw error;
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
  [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]
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


// #######

export async function updateSchool(
  id: string,
  tenantId: string,
  data: Omit<SchoolUpdateInput, 'id' | 'tenantId'>
): Promise<School> {
  try {
    const updateData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = value;
      return acc;
    }, {} as Partial<SchoolUpdateInput>);

    const updatedSchool = await prisma.$transaction(async (prisma) => {
      const school = await prisma.school.findUnique({
        where: { id, tenantId }
      });

      if (!school) {
        throw new NotFoundError('School not found');
      }

      return prisma.school.update({
        where: { id, tenantId },
        data: updateData,
      });
    });

    return updatedSchool;
  } catch (error) {
    console.error('Error updating school', { error, schoolId: id, tenantId, updateData: data });
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025':
          throw new ValidationError('Student not found', { studentId: id });
        case 'P2002':
          throw new ValidationError('Unique constraint violation', { field: error.meta?.target });
        case 'P2003':
          throw new ValidationError('Foreign key constraint violation', { field: error.meta?.field_name });
        default:
          throw new DatabaseError('An error occurred while updating the student', { errorCode: error.code });
      }
    }
    throw new DatabaseError('An unexpected error occurred while updating the student');
  }
}
