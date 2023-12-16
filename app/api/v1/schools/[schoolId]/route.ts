import { schoolPatchSchema } from "@/lib/validations/school";
import { deleteSchool, getSchool, patchSchool } from "@/services/service-school";
import { Prisma } from "@prisma/client";
import { z } from "zod";


const routeContextSchema = z.object({
    params: z.object({
      schoolId: z.string(),
    }),
  });

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const school = await getSchool(params.schoolId as string);
    if (!school) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(school), { status: 200 });
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
    await deleteSchool(params.schoolId as string);
    return new Response(null, { status: 204, statusText: "School deleted" })
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
    const body = schoolPatchSchema.parse(json);
    // data object for partial updates.
    const data: Prisma.SchoolUpdateInput = {};
    if (body.name) data.name = body.name;
    if (body.address) data.address = body.address;
    if (body.phone) data.phone = body.phone;
    if (body.email) data.email = body.email;
    if (body.website) data.website = body.website;
    if (body.users) data.users = {
      connect: body.users.map((userId: string) => ({ id: userId })),
    };
    const school = await patchSchool(params.schoolId as string, data);
    return new Response(JSON.stringify(school), { status: 200 });
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
