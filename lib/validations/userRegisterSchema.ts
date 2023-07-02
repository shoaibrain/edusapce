import * as z from "zod"

export const userRegisterSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})