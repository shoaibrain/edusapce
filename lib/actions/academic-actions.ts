"use server";
import { withAuth } from "../withAuth"
import { z } from "zod";
import { Role } from "@prisma/client";
import { classPeriodCreateSchema } from "../validations/school";
import { createClassPeriod } from "@/services/service-academic";

type ScheduleData =
  | {
      type: "recurring";
      data: RecurringScheduleInput;
    }
  | {
      type: "one-time";
      data: OneTimeScheduleInput;
    };

    type RecurringScheduleInput = {
      daysOfWeek: number[];
      startTime: string;
      endTime: string;
      startDate: string;
      endDate: string;
    };

    type OneTimeScheduleInput = {
      date: string;
      startTime: string;
      endTime: string;
    };
export const classPeriodCreate = withAuth(
  async (formData: any) => {
    try {
      // Validate the input data
      console.log("Unvalidated Data:", formData);
      const validatedData = classPeriodCreateSchema.parse(formData);
      console.log("Validated Data:", validatedData);

      // Extract and prepare data
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

      // Prepare the data for the service layer function
      const classPeriodData = {
        yearGradeLevelId,
        teacherId,
        name,
        classType,
        description,
      };

      let scheduleData: ScheduleData;

      if (scheduleType === "recurring" && recurringSchedule) {
        scheduleData = {
          type: "recurring",
          data: recurringSchedule,
        };
      } else if (scheduleType === "one-time" && oneTimeSchedule) {
        scheduleData = {
          type: "one-time",
          data: oneTimeSchedule,
        };
      } else {
        throw new Error("Invalid schedule data");
      }

      // Call the service layer function
      const createdClassPeriod = await createClassPeriod(
        classPeriodData,
        scheduleData
      );

      return {
        success: true,
        message: "Class period created successfully",
        data: createdClassPeriod,
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
