//@ts-nocheck
import prisma from "@/lib/db";


export const getEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany(
      {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          gender: true,
          email: true,
          phone: true,
          address: true,
          department: true,
  }
})
  return employees;
}
catch (error) {
  throw new Error(`Error getting all employees: ${error.message}`);
}
}


export const getEmployeesForSchool =async (schoolId:string) => {
    try {
      const employees = await prisma.employee.findMany({
        where:{
          schoolId: schoolId
        }
      })
      return employees;
    }catch (error){
      console.log(`failed to read employees for school: ${schoolId}`)
    }
}

export const getEmployee = async (employeeId: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        department: true,
        classPeriods: true,
        subjects: true,
      }
    });

    if (!employee) {
      throw new Error(`Employee with id: ${employeeId} not found`);
    }

    return employee;
  } catch (error) {
    throw new Error(`Error getting employee: ${error.message}`);
  }
};


export const deleteEmployee = async (employeeId: string) => {
  try {
    await prisma.employee.delete({
      where: {
        id: employeeId,
      },
    })
    return { ok: true };
  } catch (error) {
    throw new Error(`Error deleting employee: ${error.message}`);
  }

}

export const patchEmployee = async (employeeId: string, employee) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: employee,
    })
    return updatedEmployee;
  } catch (error) {
    throw new Error(`Error updating employee: ${error.message}`);
  }
}
 export const postEmployee = async (employee) => {
  try {
    const newEmployee = await prisma.employee.create({
      data: employee,
    })
    return newEmployee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
 }
