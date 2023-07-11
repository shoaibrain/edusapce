import * as z from "zod"

const enrollmentPatchSchema = z.object({
    admissionType: z.string().min(3).max(128).optional(),
    previousSchool: z.string().min(3).max(128).optional(),
})

export default enrollmentPatchSchema;
