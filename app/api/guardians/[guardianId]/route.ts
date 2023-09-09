import * as z from "zod"
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { guardianPatchSchema } from "@/lib/validations/guardian";

const routeContextSchema = z.object({
    params: z.object({
      guardianId: z.string(),
    }),
  })

  export async function GET (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)

      const guardian = await prisma.guardian.findUnique({
        where: {
          id: params.guardianId as string,
        },
      })

      return new Response(JSON.stringify(guardian), { status: 200})

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
      // Delete the guardian
      await prisma.guardian.delete({
        where: {
          id: params.guardianId as string,
        },
      })

      return new Response(null, { status: 204, statusText: "Guardian deleted" })

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
      const body = guardianPatchSchema.parse(json);
  
      // Construct the data object for partial updates.
      const data: Prisma.GuardianUpdateInput = {};
  
      if (body.firstName) data.firstName = body.firstName;
      if (body.lastName) data.lastName = body.lastName;
      if (body.phone) data.phone = body.phone;
      if (body.address) data.address = body.address;
      if (body.email) data.email = body.email;
      if (body.profession) data.profession = body.profession;
      if (body.annualIncome) data.annualIncome = body.annualIncome;
      if (body.students) data.students = {
        connect: body.students.map((studentId: string) => ({ id: studentId })),
      };
  
      // Update guardian
      await prisma.guardian.update({
        where: {
          id: params.guardianId,
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