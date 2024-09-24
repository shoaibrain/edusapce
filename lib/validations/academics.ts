import { z } from "zod";

export const YearGradeLevelCreateSchema = z.object({
  schoolId: z.string(),
  levelName: z.string().min(1, "Level name is required"),
  description: z.string().nullable(),
  levelCategory: z.string().min(1, "Level category is required"),
  levelOrder: z.number().int(),
  capacity: z.number().int().nullable(),
  classRoom: z.string().nullable(),
});

export type YearGradeLevelCreateInput = z.infer<typeof YearGradeLevelCreateSchema>;

const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable();

export const yearGradeLevelPatchSchema = z.object({
  id: z.string().cuid(),

})



export const ClassPeriodCreateSchema = z.object({
  gradeLevelId: z.string(),
  departmentId: z.string(),
  name: z.string().min(1, "Name is required"),
  classType: z.string().optional(),
  description: z.string().optional(),
  // Ensure valid time format for start and end times
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM format"),

}).refine(data => {
  if (data.startTime && data.endTime) {
    return data.startTime < data.endTime;
  }
  return true;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});
export type ClassPeriodCreateInput = z.infer<typeof ClassPeriodCreateSchema>;

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

