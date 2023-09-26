import * as z from "zod"

export const studentPatchSchema = z.object({
  firstName: z.string().min(2, {
    message:"First name must be at least 2 character long"
  }).max(20, {message:"Name should not be more than 20 cahracter long"}).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.date().optional(),
  gender: z.string().optional(),
  currentGrade: z.string().optional(),
  nationality: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  enrollmentStatus: z.string().optional(),
  guardians: z.array(z.string()).optional()
});

export const studentCreateSchema = z.object({
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

