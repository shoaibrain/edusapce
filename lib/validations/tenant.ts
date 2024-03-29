import * as z from "zod"

export const tenantPatchSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  email: z.string().email().optional(),

})

