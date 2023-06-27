import * as z from "zod"

const studentPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
});

export default studentPatchSchema;
