"use server";
import { revalidatePath } from "next/cache";
import { ClassPeriodCreateInput, ClassPeriodCreateSchema } from "../validations/academics"
import { withAuth } from "../withAuth"
import {  createClassPeriod } from "@/services/service-academic";
import { z } from "zod";

export const classPeriodCreate = withAuth(async (formData: ClassPeriodCreateInput) => {
  try {
    const validatedData = ClassPeriodCreateSchema.parse(formData);
    const {gradeLevelId, departmentId, ...classPeriodData} = validatedData;
    const createdClassPeriod = await createClassPeriod(gradeLevelId, departmentId, classPeriodData);
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
}, ["ADMIN", "PRINCIPAL", "TEACHER"]);
