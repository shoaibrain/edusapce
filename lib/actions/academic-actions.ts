"use server";
import { withAuth } from "../withAuth"
import { z } from "zod";
import { Role } from "@prisma/client";
import { classPeriodCreateSchema } from "../validations/school";

export const classPeriodCreate = withAuth(
  async (formData: any) => {
    try {
      // Validate the input data
      console.log("UnValidated Data:", formData);
      const validatedData = classPeriodCreateSchema.parse(formData);
      console.log("Validated Data:", validatedData);

      // Destructure the validated data
      const {
        yearGradeLevelId,
        teacherId,
        name,
        classType,
        description,
        scheduleType,
        recurringSchedule,
        oneTimeSchedule,
      } = validatedData;

      // For now, just log the data
      console.log("Creating ClassPeriod with the following data:");
      console.log({
        yearGradeLevelId,
        teacherId,
        name,
        classType,
        description,
        scheduleType,
        recurringSchedule,
        oneTimeSchedule,
      });

      // Placeholder for actual creation logic
      // const createdClassPeriod = await createClassPeriod(validatedData);

      // Revalidate the path if necessary
      // revalidatePath("/year-grade");

      return {
        success: true,
        message: "Class period created successfully",
        // data: createdClassPeriod,
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
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  },
  [Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]
);
