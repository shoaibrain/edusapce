import * as z from "zod"

export const userRegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
})