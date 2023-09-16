import * as z from "zod"

export const studentPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  middleName: z.string().min(0).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().min(3).max(128).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  enrollmentStatus: z.string().optional(),
  address: z.string().min(3).max(128).optional(),
  currentGrade: z.string().min(0).max(128).optional(),
  guardians: z.array(z.string()).optional(), // array of guardian ids
  class: z.string().optional(), // class id
})

export const studentCreateSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().min(3).max(32).optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.string(),
  email: z.string().email().optional(),
  phone: z.string().min(3).max(32).optional(),
  gender: z.string().min(3).max(8),
  address: z.string().min(3).max(32),
  enrollmentStatus: z.string().optional(),
  currentGrade: z.string()
})
