import { classPeriodPatchSchema } from "@/lib/validations/academics";
import {
  deleteClassPeriod,
  getClassPeriod,
  patchClassPeriod } from "@/services/service-academic";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    classId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const classPeriod  = await getClassPeriod(params.classId as string);
    if (!classPeriod) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(classPeriod), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    await deleteClassPeriod(params.classId as string);
    return new Response(null, { status: 204, statusText: "Class Period deleted" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = classPeriodPatchSchema.parse(json);

    const data: Prisma.CLASS_PERIODUpdateInput = {};

    if (body.name) data.name = body.name;
    if (body.startTime) data.startTime = body.startTime;
    if (body.endTime) data.endTime = body.endTime;

    const updatedClassPeriod = await patchClassPeriod(params.classId as string, data);
    return new Response(JSON.stringify(updatedClassPeriod), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}
