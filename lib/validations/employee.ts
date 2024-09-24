import * as z from "zod"

const RoleEnum = z.enum([
  "SUPPORT",
  "ADMIN",
  "PRINCIPAL",
  "TEACHER",
  "STAFF",
  "STUDENT",
  "USER"
]);

export const createEmployeeSchema = z.object({
  tenantId: z.string(),
  schoolId: z.string(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email").optional(),
  address: z.string().min(1, "Address is required"),
  birthDate: z.date().optional(),
  gender: z.string().optional(),
  ssn: z.string().optional(),
  departmentId: z.string().optional()
});

export const patchEmployeeSchema = z.object({
  employeeId: z.string(),
  firstName: z.string().min(1).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().min(10).optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  role: RoleEnum.optional(),
  birthDate: z.date().optional(),
  gender: z.string().optional(),
  ssn: z.string().optional(),
  departmentId: z.string().optional(),
});

export type EmployeeCreateInput = z.infer<typeof createEmployeeSchema>;
export type EmployeePatchInput = z.infer<typeof patchEmployeeSchema>;
