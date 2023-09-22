import * as z from "zod"

export const guardianPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  nationality: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  profession: z.string().optional(),
  annualIncome: z.string().optional(),
  students: z.array(z.string()).optional(), // array of student ids
})

export const guardianCreateSchema = z.object({
  firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  lastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  phone: z.string().min(2, {
      message: "enter vaid phone number",
    }).max(10, {
      message: "enter vaid phone number",
    }),
  address: z.string().min(2, {
      message: "enter vaid address",
    }).max(30, {
      message: "enter vaid address",
    }),
  email: z
    .string({
      required_error: "Please enter a valid email.",
    })
    .email(),
  profession: z.string(),
  annualIncome: z.string(),
  guardianType: z.string(),
  students: z.array(z.string()).optional(), // array of student ids
})
