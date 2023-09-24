import { guardianPatchSchema } from "@/lib/validations/guardian";
import { deleteGuardian, getGuardian, patchGuardian } from "@/services/service-guardian";
import { Prisma } from "@prisma/client";
import { z } from "zod";


const routeContextSchema = z.object({
    params: z.object({
      guardianId: z.string(),
    }),
  });

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const guardian = await getGuardian(params.guardianId as string);
    if (!guardian) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(guardian), { status: 200 });
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    await deleteGuardian(params.guardianId as string);
    return new Response(null, { status: 204, statusText: "Guardian deleted" })
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const json = await request.json();
    console.log(`JSON: ${JSON.stringify(json)}`)
    const body = guardianPatchSchema.parse(json);
    console.log(`Body: ${JSON.stringify(body)}`)
    // Construct the data object for partial updates.
    const data: Prisma.GuardianUpdateInput = {};
    if (body.firstName) data.firstName = body.firstName;
    if (body.lastName) data.lastName = body.lastName;
    if (body.email) data.email = body.email;
    if (body.phone) data.phone = body.phone;
    if (body.address) data.address = body.address;
    if (body.profession) data.profession = body.profession;
    if (body.annualIncome) data.annualIncome = body.annualIncome;
    if (body.students) data.students = {
      connect: body.students.map((studentId: string) => ({ id: studentId })),
    };
    const patchedGuardian = await patchGuardian(params.guardianId as string, data);
    console.log(`Patched guardian: ${JSON.stringify(patchedGuardian)}`)
    return new Response(JSON.stringify(patchedGuardian), { status: 200 });
  } catch(error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((issue) => {
        return {
          field: issue.path.join('.'),
          message: issue.message,
        };
      });
      return new Response(JSON.stringify(validationErrors), { status: 422 });
  }
    return new Response(null, { status: 500 })
}
}
