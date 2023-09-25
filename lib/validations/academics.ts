import { z } from "zod";

export const gradeLevelCreateSchema = z.object({
  name: z.string(),
  levelOrder: z.number(),
  description: z.string(),
})

export const classPeriodCreateSchema = z.object({
  name: z.string(),
  startTime: z.date(),
  endTime: z.date(),
})

export const gradeLevelPatchSchema = z.object({
  name: z.string().optional(),
  levelOrder: z.number().optional(),
  description: z.string().optional(),
  students: z.array(z.string()).optional(),
  classPeriods: z.array(z.string()).optional(),
  teachers: z.array(z.string()).optional(),
})

export const classPeriodPatchSchema = z.object({
  name: z.string().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
})
