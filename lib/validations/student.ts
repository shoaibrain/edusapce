import * as z from "zod"

const studentPatchSchema = z.object({
  firstName: z.string().min(3).max(128).optional(),
  middleName: z.string().min(0).max(128).optional(),
  lastName: z.string().min(3).max(128).optional(),
  birthDate: z.string().min(3).max(128).optional(),
  gender: z.string().min(3).max(128).optional(),
  nationality: z.string().min(3).max(128).optional(),
  email: z.string().min(3).max(128).optional(),
  phone: z.string().min(3).max(128).optional(),
  enrolled: z.boolean().optional(),
  address: z.string().min(3).max(128).optional(),
  currentGrade: z.string().min(0).max(128).optional(),
  guardians: z.array(z.string()).optional(), // array of guardian ids
  class: z.string().min(0).max(128).optional(), // class id


})

export default studentPatchSchema;
