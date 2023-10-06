import * as z from "zod"

export const userAuthSchema = z.object({
  email: z
  .string({
    required_error: "Please enter valid email address.",
  })
  .email(),
  password: z.string({
    required_error: "Please enter your password.",
  })
})
