import { te } from "date-fns/locale"
import * as z from "zod"

export const employeePatchSchema = z.object({
    firstName: z.string().min(3).max(32).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(3).max(32).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().min(3).max(32).optional(),
    gender: z.string().optional(),
    ssn: z.string().min(3).max(32).optional(),
    department: z.string().min(3).max(32).optional(),
})

export const employeeCreateSchema = z.object({
  firstName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(32),
  lastName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(32),
  phone: z.string(),
  email: z.string().email().optional(),
  address: z.string().min(5, {
    message: "provide a valid address",
  }).max(32),
  gender: z.string(),
  tenantId: z.string(),
  schoolId: z.string(),
})
