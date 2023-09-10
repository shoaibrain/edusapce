import { z } from "zod"
export const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  gender: z.string(),
  email: z.string(),
  enrollmentStatus: z.string(),
  currentGrade: z.string(),
})

export type Task = z.infer<typeof studentSchema>