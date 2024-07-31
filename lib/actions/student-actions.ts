"use server";

import { revalidatePath } from "next/cache";
import { studentCreateSchema } from "../validations/student";
import {  Student } from "@prisma/client";
import { postStudent } from "../../services/service-student";

export async function studentCreate(
  formData: any
): Promise<{ message: string; createdStudent?: Student; errorDetails?: { field?: string; message: string } }> {
  try {
    // Parse form data against schema
    const createData = studentCreateSchema.safeParse(formData);
    if (!createData.success) {
      throw new Error("Invalid create data");
    }

    const { yearGradeLevelId, ...studentData } = createData.data;

    // Call the service function to create a new student
    const createdStudent = await postStudent(studentData, yearGradeLevelId);

    // Revalidate the path to update the student list
    revalidatePath("/student");

    return { message: "ok", createdStudent };
  } catch (error) {
    console.error(error);
    if (error.message.includes("unique constraint")) {
      // Extract the field name (if possible)
      const match = error.message.match(/constraint on \(.*\)/);
      const field = match?.[1]?.split(',')[0].trim(); // Get first field name from constraint

      return {
        message: "An error occurred while creating the student. It appears that one or more fields contain duplicate values.",
        errorDetails: {
          field: field, // May be undefined if extraction fails
          message: "Please check the provided data and try again.",
        },
      };
    } else {
      // Handle other errors
      console.error(`Error while creating Student. Error:${error.message}`);
      return { message: `${error.message}` };
    }
  }
}
