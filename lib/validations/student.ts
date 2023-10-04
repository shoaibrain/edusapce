import * as z from "zod"

export const studentPatchSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  ssn: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  enrollmentStatus: z.string().optional(),
  guardians: z.array(z.string()).optional()

});

export const studentCreateSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  email: z.string().email().optional(),
  phone: z.string().min(3).max(32).optional(),
  gender: z.string().min(3).max(8),
  address: z.string().min(3).max(32),
  enrollmentStatus: z.string().optional(),
  guardians: z.array(z.string()).optional(),
  gradeLevel: z.string().optional(),
})

