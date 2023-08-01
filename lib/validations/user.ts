import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

export const studentSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),

  age: z.number().min(18).max(100),
  email: z.string().email(),

})
