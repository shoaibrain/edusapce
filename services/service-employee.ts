import prisma from "@/lib/db";

export const getEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany(
      {
        select: {
          id: true,
          firstName: true,
          lastName: true,
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

export const getEmployee = async (employeeId: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        department: true,
      }
    })
    if (!employee) {
      throw new Error(`Employee with id: ${employeeId} not found`);
    }
    return employee;
  } catch (error) {
    throw new Error(`Error getting employee: ${error.message}`);
  }
}

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
      data: {
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        birthDate: employee.birthDate,
        gender: employee.gender,
        address: employee.address,
        phone: employee.phone,
        email: employee.email,
        department: employee.department,
        ssn: employee.ssn,
    },
    })
    return newEmployee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }

 }
