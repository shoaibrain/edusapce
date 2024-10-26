"use server";
import { revalidatePath } from "next/cache";
import { ClassPeriodCreateInput, ClassPeriodCreateSchema } from "../validations/academics"
import { withAuth } from "../withAuth"
import {  createClassPeriod } from "@/services/service-academic";
import { z } from "zod";
import { Role } from "@prisma/client";

export const classPeriodCreate = withAuth(async (formData: ClassPeriodCreateInput) => {
  try {
    const validatedData = ClassPeriodCreateSchema.parse(formData);
    const {gradeLevelId, departmentId, instructorId, ...classPeriodData} = validatedData;
    const createdClassPeriod = await createClassPeriod(gradeLevelId, departmentId, instructorId, classPeriodData);
    revalidatePath("/year-grade");
    return {
      success: true,
      message: "Class period created successfully",
      data: createdClassPeriod
    };
  } catch (error) {
    console.error("Error creating ClassPeriod", error);
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
}, [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]);
