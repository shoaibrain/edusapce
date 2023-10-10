import * as z from "zod"

export const studentPatchSchema = z.object({
  firstName: z.string().min(3).max(32).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(32).optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  ssn: z.string().optional(),
  email: z
  .string({
    required_error: "enter a valid email.",
  })
  .email().optional(),
  phone: z.string().min(2, {
    message: "enter vaid phone number.",
  }).max(12, {
    message: "enter vaid phone number.",
  }).optional(),
  address: z.string().optional(),
  enrollmentStatus: z.string().optional(),
  guardians: z.array(z.string()).optional() // array of guardian ids

});

export const studentCreateSchema = z.object({
  firstName: z.string().min(3).max(32),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(32),
  birthDate: z.date(),
  email: z.string().email().optional(),
  phone: z.string().min(3).max(32).optional(),
  gender: z.string().min(3).max(8),
  address: z.string().min(3).max(32),
  enrollmentStatus: z.string().optional(),
  guardians: z.array(z.string()).optional(),
  gradeLevel: z.string().optional(),
})

