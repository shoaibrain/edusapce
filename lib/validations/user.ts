import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

export const studentSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  email: z.string().email(),
  phone: z.string().min(3).max(32),
  gender: z.string().min(3).max(32),

})

export const guardianSchema = z.object({
  firstName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(32),
  email: z.string().email(),
  phone: z.string().min(3).max(32),
  address: z.string().min(3).max(32),
  guardianType: z.string().min(3).max(32),
})