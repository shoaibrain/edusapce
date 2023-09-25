import { gradeLevelPatchSchema } from "@/lib/validations/academics";
import { deleteGradeLevel, getGradeLevel, patchGradeLevel } from "@/services/service-academic";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    gradeId: z.string(),
  }),
})

export async function GET (
  req: Request,
  context: z.infer<typeof routeContextSchema>
){
  try {
    const { params } = routeContextSchema.parse(context)
    const gradeLevel = await getGradeLevel(params.gradeId as string);
    if (!gradeLevel) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(gradeLevel), { status: 200})
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
){
  try {
    const { params } = routeContextSchema.parse(context)
    await deleteGradeLevel(params.gradeId as string);
    return new Response(null, { status: 204, statusText: "Grade Level deleted" })
  } catch(error){
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
){
  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = gradeLevelPatchSchema.parse(json);

    const data: Prisma.GRADE_LEVELUpdateInput = {};

    if (body.name) data.name = body.name;
    if (body.description) data.description = body.description;
    if (body.teachers) data.teachers = {
      connect: body.teachers.map((teacherId: string) => ({ id: teacherId })),
    }
    if (body.students) data.students = {
      connect: body.students.map((studentId: string) => ({ id: studentId })),
    }
    if (body.classPeriods) data.classPeriods = {
      connect: body.classPeriods.map((classPeriodId: string) => ({ id: classPeriodId })),
    }

    const updatedGradeLevel = await patchGradeLevel(params.gradeId as string, data);
    return new Response(JSON.stringify(updatedGradeLevel), { status: 200 })
  } catch(error){
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error.message, { status: 500 })
  }
}
