import * as z from "zod"

export const employeePatchSchema = z.object({
    firstName: z.string().min(3).max(32).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(3).max(32).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().min(3).max(32).optional(),
    birthDate: z.date().optional(),
    department: z.string().min(3).max(32).optional(),

})
export const employeeCreateSchema = z.object({
  firstName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(32),
  middleName: z.string().optional(),
  lastName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(32),
  phone: z.string(),
  email: z.string().email().optional(),
  address: z.string().min(5, {
    message: "provide a valid address",
  }).max(32),
  birthDate: z.date(),
  gender: z.string(),
  ssn: z.string().min(3).max(32),
  department: z.string().min(3).max(32)
})
