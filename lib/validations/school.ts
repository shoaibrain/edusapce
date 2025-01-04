import { DepartmentEnum } from "@/types/department";
import { Description } from "@radix-ui/react-toast";
import { z } from "zod";

export const schoolCreateSchema = z.object({
  tenantId: z.string(),
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional(),
  website: z.string().url("Invalid URL").optional(),

});
export type SchoolCreateInput = z.infer<typeof schoolCreateSchema>;

export const departmentCreateSchema = z.object({
  schoolId: z.string(),
  departments: z.array(z.nativeEnum(DepartmentEnum)).min(1, "At least one new department must be selected"),
});

export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;


export const schoolUpdateSchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string(),
  name: z.string().min(1).max(255),
  address: z.string().min(1).max(1000),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  email: z.string().email().optional().nullable(),
  website: z.string().url().optional().nullable(),
  schoolType: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
}).strict();

export type SchoolUpdateInput = z.infer<typeof schoolUpdateSchema>;

// Schema for RecurringSchedule
const recurringScheduleSchema = z.object({
  daysOfWeek: z
    .array(
      z
        .number()
        .min(0)
        .max(6, "Day of week must be between 0 (Sunday) and 6 (Saturday)")
    )
    .nonempty("Please select at least one day of the week"),
  startTime: z.string(), // Time in HH:mm format
  endTime: z.string(),
  startDate: z.string(), // Date in YYYY-MM-DD format
  endDate: z.string(),
});

// Schema for OneTimeSchedule
const oneTimeScheduleSchema = z.object({
  date: z.string(), // Date in YYYY-MM-DD format
  startTime: z.string(),
  endTime: z.string(),
});

// Update classPeriodCreateSchema
export const classPeriodCreateSchema = z
  .object({
    yearGradeLevelId: z.string(),
    name: z.string().min(1, "Name is required"),
    classType: z.string().optional(),
    description: z.string().optional(),
    teacherId: z.string().optional(),
    scheduleType: z.enum(["recurring", "one-time"]),
    recurringSchedule: recurringScheduleSchema.optional(),
    oneTimeSchedule: oneTimeScheduleSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.scheduleType === "recurring") {
      if (!data.recurringSchedule) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Recurring schedule details are required",
          path: ["recurringSchedule"],
        });
      }
    } else if (data.scheduleType === "one-time") {
      if (!data.oneTimeSchedule) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "One-time schedule details are required",
          path: ["oneTimeSchedule"],
        });
      }
    }
  });

export type ClassPeriodCreateInput = z.infer<typeof classPeriodCreateSchema>;
