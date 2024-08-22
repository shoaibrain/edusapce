import * as z from "zod"

export const studentCreateSchema = z.object({
  schoolId: z.string().min(1),
  firstName: z.string().min(3).max(32),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  gender: z.string().min(3).max(8),

  email: z.string().email().optional(),
  phone: z.string().min(3).max(32).optional(),

  address: z.string().min(3).max(32),
  guardians: z.array(z.string()).optional(),
  yearGradeLevelId: z.string(),

})


// Helper function to make a field optional and nullable
const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable();

export const studentPatchSchema = z.object({
  id: z.string().cuid(),
  schoolId: z.string().cuid().optional(),
  firstName: z.string().min(3).max(32).optional(),
  middleName: optionalNullable(z.string().max(32)),
  lastName: z.string().min(3).max(32).optional(),
  birthDate: z.union([z.date(), z.string().pipe(z.coerce.date())]).optional(),
  gender: z.string().min(3).max(8).optional(),
  nationality: optionalNullable(z.string().max(50)),
  ssn: optionalNullable(z.string().max(20)),
  email: optionalNullable(z.string().email()),
  phone: optionalNullable(z.string().min(3).max(32)),
  address: z.string().min(3).max(255).optional(),
  enrollmentStatus: z.enum([
    "ADMITTED", "ENROLLED", "TRANSFERRED", "GRADUATED", "WITHDRAWN", "SUSPENDED"
  ]).optional(),
  yearGradeLevelId: z.string().cuid().optional(),
  guardians: z.array(z.string().cuid()).optional(),
}).strict().refine(data => Object.keys(data).length > 1, {
  message: "At least one field besides 'id' must be provided for update"
});
export type StudentPatchInput = z.infer<typeof studentPatchSchema>;
