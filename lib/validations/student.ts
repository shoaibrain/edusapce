import * as z from "zod"

export const studentPatchSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  nationality: z.string().optional(),
  enrollmentStatus: z.string().optional(),
  currentGrade: z.string().optional(),
  guardians: z.array(z.string()).optional()
});

export const studentAdmitSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().min(3).max(32).optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  email: z.string().email().optional(),
  phone: z.string().min(3).max(32).optional(),
  gender: z.string().min(3).max(8),
  address: z.string().min(3).max(32),
  enrollmentStatus: z.string().optional(),
  currentGrade: z.string().optional(),
})

