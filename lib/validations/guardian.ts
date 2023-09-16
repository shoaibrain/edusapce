import * as z from "zod"

export const guardianPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  nationality: z.string().min(3).max(128).optional(),
  email: z.string().min(3).max(128).optional(),
  phone: z.string().min(3).max(128).optional(),
  address: z.string().min(3).max(128).optional(),
  profession: z.string().min(3).max(128).optional(),
  annualIncome: z.string().min(3).max(128).optional(),
  students: z.array(z.string()).optional(), // array of student ids
})


export const guardianCreateSchema = z.object({
  firstName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(32),
  phone: z.string().min(3).max(32),
  address: z.string().min(3).max(32),
  email: z.string().email().optional(),
  profession: z.string().min(3).max(32),
  annualIncome: z.string().optional(),
  guardianType: z.string().min(3).max(10),
})
