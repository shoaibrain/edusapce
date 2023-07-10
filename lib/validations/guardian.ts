import * as z from "zod"

const guardianPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  nationality: z.string().min(3).max(128).optional(),
  email: z.string().min(3).max(128).optional(),
  phone: z.string().min(3).max(128).optional(),
  address: z.string().min(3).max(128).optional(),
  students: z.array(z.string()).optional(), // array of student ids
})

export default guardianPatchSchema;
