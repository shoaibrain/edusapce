"use server"
import { revalidatePath } from "next/cache";
import { createEmployeeSchema, EmployeeCreateInput, EmployeePatchInput, employeePatchSchema } from "../validations/employee";
import { withAuth } from "../withAuth";
import { z } from "zod";
import { createEmployee, updateEmployee } from "@/services/service-school";
import { Role } from "@prisma/client";

export async function getEmployeeMetricsForSchool(
  schoolId: string
): Promise<{ message: string; employeeMetrics?: EmployeeMetrics }> {
  try {
    // Simulate retrieving employee data (replace with actual data retrieval)
    const employeeMetrics: EmployeeMetrics = {
      averageTenureYears: parseFloat((Math.random() * 100).toFixed(2)), // Years of employment
      averagePerformanceRating: parseFloat((Math.random() * 100).toFixed(2)), // Rating out of 4 (replace with actual scale)
      retentionRate: parseFloat((Math.random() * 100).toFixed(2)), // Percentage of employees retained
      absenteeismRate: parseFloat((Math.random() * 5).toFixed(2)), // Percentage of days absent
      professionalDevelopmentHours: parseFloat((Math.random() * 100).toFixed(2)), // Average hours of training
      sickLeaveDaysTaken: parseFloat((Math.random() * 100).toFixed(2)), // Average sick days
      employeeSatisfactionScore:parseFloat((Math.random() * 100).toFixed(2)), // Score out of 5 (replace with actual scale)
      studentToTeacherRatio: parseFloat((Math.random() * 100).toFixed(2)), // Ratio of students to teachers
    };
    return { message: 'School employee overview retrieved successfully', employeeMetrics };
  } catch (error) {
    console.error('Error fetching school employee overview data:', error);
    return { message: 'Failed to retrieve school employee overview data' };
  }
}

interface EmployeeMetrics {
  averageTenureYears: number;
  averagePerformanceRating: number;
  retentionRate: number;
  absenteeismRate: number;
  professionalDevelopmentHours: number;
  sickLeaveDaysTaken: number;
  employeeSatisfactionScore: number;
  studentToTeacherRatio: number;
}

//##########//

export const EmployeeCreate = withAuth(async (formData:EmployeeCreateInput) => {
  try {
    const validatedData = createEmployeeSchema.parse(formData);
    const{tenantId, schoolId, ...employeeData} = validatedData;
    const createdEmployee = await createEmployee(tenantId, schoolId, employeeData);
    revalidatePath("/employees");
    return {
      success: true,
      message: "Employee created successfully",
      data: createdEmployee
    };
  } catch(error){
    console.error("Error creating Employee", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
},[Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);

export const EmployeeUpdate = withAuth(async (formData: EmployeePatchInput) => {
  try {
    const validatedData = employeePatchSchema.parse(formData);
    const { id, ...updateData } = validatedData;
    if (!id) {
      throw new Error("Employee ID is required for updating");
    }
    const updatedEmployee = await updateEmployee(id, updateData);
    revalidatePath(`/employees/${id}`);
    return {
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    };
  } catch (error) {
    console.error("Error updating Employee", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}, [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);
