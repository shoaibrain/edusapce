"use server";
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { TenantCreate, tenantCreateSchema, TenantUpdate, tenantUpdateSchema } from '../validations/tenant';
import { createTenant, getSchoolsForTenant, getTenantById, updateTenant } from '@/services/service-tenant';
import { withAuth } from '../withAuth';
import { Role } from '@prisma/client';

export const tenantCreate = async (formData: TenantCreate) => {
  try {
    const validatedData = tenantCreateSchema.parse(formData);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const tenantData = {
      ...validatedData,
      password: hashedPassword,
    };
    const createdTenant = await createTenant(tenantData);
    revalidatePath("/tenants");
    return {
      success: true,
      message: "Tenant created successfully",
      data: createdTenant,
    };
  } catch (error) {
    console.error("Error creating Tenant", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const tenantUpdate = withAuth(async (formData: TenantUpdate) => {
  try {
    const validatedData = tenantUpdateSchema.parse(formData);
    if (validatedData.password) {
      validatedData.password = await bcrypt.hash(validatedData.password, 10);
    }
    const updatedTenant = await updateTenant(validatedData);
    revalidatePath("/tenants");
    revalidatePath(`/tenants/${updatedTenant.id}`);
    return {
      success: true,
      message: "Tenant updated successfully",
      data: updatedTenant,
    };
  } catch (error) {
    console.error("Error updating Tenant", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}, [Role.SUPER_ADMIN, Role.TENANT_ADMIN]);

export const getTenant = withAuth(
  async ( tenantId: string) => {
    try {
      const tenant = await getTenantById(tenantId)
      if (!tenant) {
        return {
          success: false,
          message: "Tenant not found",
          data: null
        }
      }
      return {
        success: true,
        message: "success",
        data:tenant
      }
    } catch (error) {
      console.error("Error in getTenant server action:", error)
      return {
        success: false,
        message: "An unexpected error occurred while fetching the tenant",
        data: null
      }
    }
  },
  [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]
)

export const getTenantSchools = withAuth(async (tenantId: string) => {
  try {
    const schools = await getSchoolsForTenant(tenantId);
    return { success: true, data: schools };
  } catch (error) {
    console.error('Failed to fetch schools:', error);
    return { success: false, error: 'Failed to fetch schools' };
  }
},  [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);
