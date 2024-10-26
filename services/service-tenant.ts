import prisma from "@/lib/db";
import { TenantCreate, TenantUpdate } from "@/lib/validations/tenant";
import { School, Tenant } from "@prisma/client";

export const createTenant = async (tenantData: TenantCreate): Promise<Tenant> => {
  try {
    const { name, email, password } = tenantData;
    const createdTenant = await prisma.tenant.create({
      data: {
        name,
        email,
        hashedPassword: password
      },
    });
    return createdTenant;
  } catch (error) {
    console.error(`Failed to create tenant: ${error.message}`);
    throw new Error('Failed to create tenant');
  }
};


export const updateTenant = async (tenantData: TenantUpdate): Promise<Tenant> => {
  try {
    const { id, password, ...updateData } = tenantData;
    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: {
        ...updateData,
        ...(password && { password }),
      },
    });
    if (updateData.email && updateData.email !== updatedTenant.email) {
      await prisma.tenant.update({
        where: { id },
        data: { emailVerified: null },
      });
      // Optional: send a verification email
      // await sendVerificationEmail(updateData.email);
    }
    return updatedTenant;
  } catch (error) {
    console.error(`Failed to update tenant: ${error.message}`);
    throw new Error('Failed to update tenant');
  }
};


export const getSchoolsForTenant = async(tenantId: string): Promise<School[]> =>{
  try {
    const schools = await prisma.school.findMany({
      where: {
        tenantId: tenantId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return schools;
  } catch(error) {
    console.error('Error fetching schools for tenant:', error);
    throw new Error('Failed to fetch schools for tenant');
  }
}

type TenantSelect = {
  id: string
  name: string
  email: string
  phone: string | null
  image: string | null
  address: string | null
}

export const getTenantById = async(tenantId: string): Promise<TenantSelect | null> => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: tenantId
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        image: true,
        address: true
      }
    })
    return tenant
  } catch(error) {
    console.error("Error fetching tenant:", error)
    throw new Error("Failed to fetch tenant")
  }
}
