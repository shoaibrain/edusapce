import { DepartmentEnum } from "@/types/department";
import * as z from "zod"

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
