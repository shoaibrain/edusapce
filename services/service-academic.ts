import prisma from "@/lib/db";

type ResourceType = 'SchoolYear' | 'SchoolTerm' | 'YearGradeLevel' | 'ClassPeriod';

export const createResource = async (resourceType: ResourceType, data: any) => {
  try {
    const resource = await prisma[resourceType].create({
      data,
    });
    return resource;
  } catch (error) {
    throw new Error(`Error creating ${resourceType}: ${error.message}`);
  }
}

export const getAllResources = async (resourceType: ResourceType) => {
  try {
    const resources = await prisma[resourceType].findMany();
    return resources;
  } catch (error) {
    throw new Error(`Error getting all ${resourceType}s: ${error.message}`);
  }
}

export const getResourceById = async (resourceType: ResourceType, resourceId: string) => {
  try {
    const resource = await prisma[resourceType].findUnique({
      where: {
        id: resourceId,
      },
    });
    if (!resource) {
      throw new Error(`${resourceType} with id: ${resourceId} not found`);
    }
    return resource;
  } catch (error) {
    throw new Error(`Error getting ${resourceType}: ${error.message}`);
  }
}

export const updateResource = async (resourceType: ResourceType, resourceId: string, data: any) => {
  try {
    const updatedResource = await prisma[resourceType].update({
      where: {
        id: resourceId,
      },
      data,
    });
    return updatedResource;
  } catch (error) {
    throw new Error(`Error updating ${resourceType}: ${error.message}`);
  }
}

