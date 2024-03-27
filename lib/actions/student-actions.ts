"use server"

import { z } from "zod";
import { studentProfilePatchSchema } from "../validations/student";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

type profilePatchFormData = z.infer<typeof studentProfilePatchSchema>

export async function handleStudentProfilePatch(
  studentId: string,
  payload: profilePatchFormData
):  Promise<{ message: string}> {
  try {
      // handle a partial student profile patch operation
      const updates: Prisma.StudentUpdateInput = {};
      if (payload.firstName) updates.firstName = payload.firstName;
      if (payload.lastName) updates.lastName = payload.lastName;
      if (payload.middleName) updates.middleName = payload.middleName;
      if (payload.gender) updates.gender = payload.gender;
      if (payload.ssn) updates.ssn = payload.ssn;
      if (payload.email) updates.email = payload.email;
      if (payload.phone) updates.phone = payload.phone;
      if (payload.address) updates.address = payload.address;
      if (payload.enrollmentStatus) updates.enrollmentStatus = payload.enrollmentStatus;
      if (payload.guardians) updates.guardians = {
        connect: payload.guardians.map((guardianId: string) => ({ id: guardianId })),
      };
      const patchedStudent = await prisma.student.update({
        where: { id: studentId },
        data: updates,
      });
      if (!patchedStudent) {
        return { message: "Failed to update student profile" };
      }
      revalidatePath(`/students/${studentId}`);
      return { message: "success" };

  } catch (error) {
    console.error("Error patching student profile:", error);
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return { message: `${validationErrors}` };
    } else {
      return { message: "Failed to update student profile" };
    }
  }
}
