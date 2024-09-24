import { DepartmentEnum } from "@/types/department";
import * as z from "zod"

export const schoolCreateSchema = z.object({
  tenantId: z.string(),
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional(),
  website: z.string().url("Invalid URL").optional(),

});
export type SchoolCreateInput = z.infer<typeof schoolCreateSchema>;

export const departmentCreateSchema = z.object({
  schoolId: z.string(),
  departments: z.array(z.nativeEnum(DepartmentEnum)).min(1, "At least one new department must be selected"),
});

export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;

export const schoolPatchSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().url().optional(),
})

export const schoolYearCreateSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  allocatedBudget: z.number().optional(),
  registrationClose: z.date().optional(),
})

export const schoolTermCreateSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  schoolYearId: z.string(),
  registrationClose: z.date().optional(),
})

export const employeeSalaryCreateSchema = z.object({
  salaryType: z.string(),
  amount: z.number(),
  currency: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.string().optional(),
  employeeId: z.string(),
})


