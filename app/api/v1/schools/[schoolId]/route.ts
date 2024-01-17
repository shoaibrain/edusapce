import { schoolPatchSchema } from "@/lib/validations/school";
import { deleteSchool, getSchoolsByTenant, patchSchool } from "@/services/service-school";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { logger } from "@/logger";


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
    // get all schools for this tenant
    const schools = await getSchoolsByTenant(params.schoolId as string);
    if (!schools) {
      logger.info(`No schools found for id ${params.schoolId}`)
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(schools), { status: 200 });
  } catch(error) {
    logger.warn(`Failed to get schools: ${error.message}`)
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
    logger.info(`Deleting school ${params.schoolId}`)
    await deleteSchool(params.schoolId as string);
    return new Response(null, { status: 204, statusText: "School deleted" })
  } catch(error) {
    if (error instanceof z.ZodError) {
      logger.warn(`Failed to delete school: ${error.message}`)
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
    logger.info(`Updating school ${JSON.stringify(data)} `)
    const school = await patchSchool(params.schoolId as string, data);
    return new Response(JSON.stringify(school), { status: 200 });
  } catch(error) {
    logger.warn(`Failed to update school: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
