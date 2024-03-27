"use server";
import { Employee } from "@prisma/client";
import { z } from "zod";
import { employeeCreateSchema } from "../validations/employee";
import prisma from "../db";

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

type formData = z.infer<typeof employeeCreateSchema>

export async function createEmployee(employee: formData): Promise<{ message: string; employee?: Employee }> {
  try {
    const newEmployee = await prisma.employee.create({
      data: employee
    })
    if (!newEmployee) {
      return { message: 'Failed to create employee' };
    }
    return { message: 'success', employee: newEmployee };
  } catch (error) {
    console.error('Error creating employee:', error);
    return { message: `${error}` };
  }
}
