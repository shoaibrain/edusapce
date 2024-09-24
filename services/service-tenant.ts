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
      },
      include:{
        schools: true
      }
    });
    return tenant;
  } catch (error) {
    throw new Error(`Error getting tenant: ${error.message}`);
  }
}

export const getSchoolsForTenant = async (tenantId: string) => {
  try {
    const schools = await prisma.school.findMany({
      //bug: this is not filtering by tenantId
      where: {
        tenantId: tenantId,
      },
    });
    return schools;
  } catch (error) {
    console.log(`Error getting schools: ${error}`)
    throw new Error(`Error getting schools: ${error.message}`);
  }
}

export const patchTenant = async (tenantId: string, payload: any) => {
  try {
    const tenant = await prisma.tenant.update({
      where: {
        id: tenantId,
      },
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        image: payload.image,
      },
    });
    return tenant;
  } catch (error) {
    console.log(`Error updating tenant: ${error}`)
    throw new Error(`Error updating tenant: ${error.message}`);
  }
}

export const getTenantForSchool = async (schoolId: string) => {
  try {
    const result = await prisma.school.findUnique({
      where: {
        id: schoolId,
      },
      select: {
        tenant: true,
      },
    });

    if (!result) {
      throw new Error(`School with ID ${schoolId} not found`);
    }
    return result.tenant;
  } catch (error) {
    console.error("Error fetching tenant for school", error);
    throw new Error(`Failed to fetch tenant for school: ${error.message}`);
  }
};
