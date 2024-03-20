import { z } from "zod";



const routeContextSchema = z.object({
  params: z.object({
    gradeLevelId: z.string(),
  }),
});

// get all students for gradeLevel
