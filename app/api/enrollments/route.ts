import * as z from "zod";
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

const enrollmentDetailsSchema = z.object({
  admissionType: z.string(),
  previousSchool: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get student ID from the request
    const studentId  = 1234;

    // Retrieve the student from the database
    const student = await prisma.student.findUnique({
      where: { id: "33" },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Get enrollment data from request and validate against the schema
    const { admissionType, previousSchool } = enrollmentDetailsSchema.parse(
      request.body
    );

    // Create the enrollment record for the student
    const enrollment = await prisma.enrollment.create({
      data: {
        student: { connect: { id: "studentId" } },
        admissionType,
        previousSchool,
      },
    });

    return new NextResponse(JSON.stringify(enrollment));
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return new NextResponse("Invalid request data", { status: 400 });
  }
}
