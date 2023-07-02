import * as z from "zod"

export const studentAdmissionFormSchema = z.object({
  firstName: z.string().min(2, { message: "first name required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "last name required" }),
  email: z.string().email({ message: "invalid email" }).optional(),
  birthDate: z.date(),
  gender: z.string(),
  nationality: z.string(),
  phone: z.string().min(10, { message: "invalid phone number" }),
  address: z.string().min(10, { message: "Address required" }),
})