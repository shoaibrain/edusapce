import * as z from "zod"

export const studentAdmissionFormSchema = z.object({
  firstName: z.string().min(2),
  middleName: z.string().min(2).optional(),
  lastName: z.string().min(2),
  birthDate: z.date(),
  gender: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  nationality: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string().optional(),
  }),
  guardian: z.object({
    firstName: z.string().min(2),
    middleName: z.string().min(2).optional(),
    lastName: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      zipCode: z.string().optional(),
    }),
  }),
  enrollment: z.object({
    gradeLevel: z.string().optional(),
    schoolYear: z.string().optional(),
    section: z.string().optional(),
    previousSchool: z.string().optional(),
  })
})