import prisma from "@/lib/db";

export const getTenants = async () => {
  try {
    const tenants = await prisma.tenant.findMany();
    return tenants;
  } catch (error) {
    throw new Error(`Error getting tenants: ${error.message}`);
  }
}

export const getTenant = async (tenantId: string) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: tenantId,
      }
    })
    if (tenant) {
      return tenant;
    }
    return null;
  } catch (error) {
    throw new Error(`Error getting tenant: ${error.message}`);
  }
}

export const postTenant = async (tenant) => {
  try {
    const tenantData = {
      name: tenant.name,
      address: tenant.address,
      phone: tenant.phone,
      email: tenant.email,
      website: tenant.website,
      users: tenant.users,
    };
    if (tenant.users && tenant.users.length > 0) {
      tenantData.users = {
        connect: tenant.users.map((userId) => ({ id: userId })),
      };
    }
    const newTenant = await prisma.tenant.create({
      data: tenantData,
    })
    return newTenant;
  } catch (error) {
    throw new Error(`Error creating tenant: ${error.message}`);
  }
}
