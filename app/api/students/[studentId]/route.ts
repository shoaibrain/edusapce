import * as z from "zod"
import prisma from "@/lib/db";
import studentPatchSchema from "@/lib/validations/student";
import { Prisma } from "@prisma/client";

const routeContextSchema = z.object({
    params: z.object({
      studentId: z.string(),
    }),
  })

  export async function GET (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)
      // Delete the student
      const student = await prisma.student.findUnique({
        where: {
          id: params.studentId as string,
        },
      })

      return new Response(JSON.stringify(student), { status: 200})

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
  export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)
      // Delete the student
      await prisma.student.delete({
        where: {
          id: params.studentId as string,
        },
      })

      return new Response(null, { status: 204, statusText: "Student deleted" })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
  
  export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    try {
      // Validate route params.
      const { params } = routeContextSchema.parse(context);
      console.log(params);
  
      // Get the request body and validate it.
      const json = await req.json();
      const body = studentPatchSchema.parse(json);
  
      // Construct the data object for partial updates.
      const data: Prisma.StudentUpdateInput = {};
  
      if (body.firstName) data.firstName = body.firstName;
      if (body.middleName) data.middleName = body.middleName;
      if (body.lastName) data.lastName = body.lastName;
      if (body.birthDate) data.birthDate = body.birthDate;
      if (body.gender) data.gender = body.gender;
      if (body.nationality) data.nationality = body.nationality;
      if (body.email) data.email = body.email;
      if (body.phone) data.phone = body.phone;
      if (body.enrolled !== undefined) data.enrolled = body.enrolled;
      if (body.address) data.address = body.address;
      if (body.currentGrade) data.currentGrade = body.currentGrade;
      if (body.guardians) data.guardians = {
        connect: body.guardians.map((guardianId: string) => ({ id: guardianId })),
      };
  
      // Update student
      await prisma.student.update({
        where: {
          id: params.studentId,
        },
        data,
      });
  
      return new Response(null, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map((issue) => {
          return {
            field: issue.path.join('.'),
            message: issue.message,
          };
        });
  
        return new Response(JSON.stringify(validationErrors), { status: 422 });
      }
  
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
  