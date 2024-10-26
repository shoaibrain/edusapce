import { z } from 'zod';

export const tenantCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path to the error field
});

const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable();

export const tenantUpdateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: optionalNullable(z.string()),
  address: optionalNullable(z.string()),
  image: optionalNullable(z.string()),
  password: optionalNullable(z.string()),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type inference
export type TenantCreate = z.infer<typeof tenantCreateSchema>;
export type TenantUpdate = z.infer<typeof tenantUpdateSchema>;
