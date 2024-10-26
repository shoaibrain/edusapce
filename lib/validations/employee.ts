import * as z from "zod"


export const createEmployeeSchema = z.object({
  schoolId: z.string(),
  tenantId: z.string(),
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

// Helper function to make a field optional and nullable
const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable();

export const employeePatchSchema = z.object({
  id: z.string().cuid(),
  schoolId: z.string().cuid().optional(),
  departmentId: optionalNullable(z.string().cuid()),
  firstName: z.string().min(3).max(32).optional(),
  middleName: optionalNullable(z.string().max(32)),
  lastName: z.string().min(3).max(32).optional(),
  phone: z.string().min(3).max(32).optional(),
  email: optionalNullable(z.string().email()),
  address: z.string().min(3).max(255).optional(),
  role: z.enum(["STAFF", "TEACHER", "ADMINISTRATOR"]).optional(),
  birthDate: z.union([z.date(), z.string().pipe(z.coerce.date())]).optional(),
  gender: optionalNullable(z.string().min(3).max(8)),
  ssn: optionalNullable(z.string().max(20)),
}).strict().refine(data => Object.keys(data).length > 1, {
  message: "At least one field besides 'id' must be provided for update"
});

export type EmployeePatchInput = z.infer<typeof employeePatchSchema>;
export type EmployeeCreateInput = z.infer<typeof createEmployeeSchema>;
