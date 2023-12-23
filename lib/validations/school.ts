import * as z from "zod"
export const schoolCreateSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  website: z.string().url().optional(),
  users: z.array(z.string()).optional(),
})

export const schoolPatchSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().url().optional(),
  users: z.array(z.string()).optional(),
})


export const schoolYearCreateSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  allocatedBudget: z.number().optional(),
  registrationClose: z.date().optional(),
})

export const schoolTermCreateSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  schoolYearId: z.string(),
  registrationClose: z.date().optional(),
})

export const YearGradeLevelCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  levelCategory: z.string(),
  levelOrder: z.number(),
  capacity: z.number().optional(),
  classRoom: z.string().optional(),
  schoolYearId: z.string().optional(),
})

export const ClassPeriodCreateSchema = z.object({
  name: z.string(),
  classType: z.string().optional(),
  capacity: z.number().optional(),
  department: z.string(),
  description: z.string().optional(),
  startTime: z.date(),
  endTime: z.date(),
  gradeLevelId: z.string().optional(),
  subjectId: z.string().optional(),
})

export const employeeSalaryCreateSchema = z.object({
  salaryType: z.string(),
  amount: z.number(),
  currency: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.string().optional(),
  employeeId: z.string(),
})


