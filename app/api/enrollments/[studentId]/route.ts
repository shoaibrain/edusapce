import * as z from "zod";
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import enrollmentPatchSchema from "@/lib/validations/enrollment";

const enrollmentDetailsSchema = z.object({
  admissionType: z.string(),
  previousSchool: z.string().optional(),
});


const routeContextSchema = z.object({
    params: z.object({
      studentId: z.string(),
    }),
  })

export async function POST(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {

  try {
    // Get student ID from the request
    const { params } = routeContextSchema.parse(context)
    // Retrieve the student from the database
    const student = await prisma.student.findUnique({
      where: {
        id: params.studentId as string,
      },
    });
    
    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    const json = await req.json();
    const body = enrollmentDetailsSchema.parse(json);

    // Create the enrollment record for the student
    const enrollment = await prisma.enrollment.create({
      data: {
        student: { connect: { id: params.studentId } },
        admissionType: body.admissionType,
      },
    });

    return new NextResponse(JSON.stringify(enrollment));
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return new NextResponse("Invalid request data", { status: 400 });
  }
}

export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>
){
try{
    // Get student ID from the request
    const { params } = routeContextSchema.parse(context)

    // retireve enrollment record for the student
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            studentId: params.studentId as string,
        },
    });

} catch (error) {
    console.error("Error retrieving enrollment:", error);
    return new NextResponse("Invalid request data", { status: 400 });
  }
}

export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
){
    try {
        // Get student ID from the request
        const { params } = routeContextSchema.parse(context)
       
        // Get the request body and validate it.
       const json = await req.json();
       const body = enrollmentPatchSchema.parse(json);
      // Construct the data object for partial updates.
      console.log(body)
    } catch(error) {
        console.error("Error updating enrollment:", error);
        return new NextResponse("Invalid request data", { status: 400 });
    }
}