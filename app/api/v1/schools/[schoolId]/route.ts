import {
  addGradeLevels,
  deleteSchool,
  getSchool as getSchoolById,
  patchGradeLevel,
  patchSchoolProfile
} from "@/services/service-school";

import { z } from "zod";
import { logger } from "@/logger";
import { NextRequest } from "next/server";
import {
  YearGradeLevelCreateSchema,
} from "@/lib/validations/school";

const routeContextSchema = z.object({
    params: z.object({
      schoolId: z.string()
    }),
  });

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {

  try {
    const {params } = routeContextSchema.parse(context);
    // get all schools for this tenant
    const schools = await getSchoolById(params.schoolId as string);
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
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action');
    const json = await request.json();
    // Centralized handling for different update types
    // based on payload data,and request-params
    // various patch related operations performed
    // on school, which is an individual data intity
    // with unique identifier
    await handleUpdates(params.schoolId as string, action, json);
    return new Response(null, { status: 200 });
  } catch(error) {
    logger.warn(`Failed to update school: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

// YearGradeLevel are created through
// school patch operations.
async function handleUpdates(schoolId: string,
  action: string | null,
  payload: any) {
    if (action === 'grade-add') { // create grade_level in school
      await handleSchoolGradeLevelAdd(schoolId, payload);
    } else if (action === 'profile-patch') {
      await handleSchoolProfilePatch(schoolId, payload);
    }
}

async function handleSchoolGradeLevelAdd(schoolId: string, data: any) {
  const gradeLevelAddData = YearGradeLevelCreateSchema.parse(data.grade)
  await addGradeLevels(schoolId, gradeLevelAddData);
}

async function handleSchoolProfilePatch(schoolId: string, data: any) {
  await patchSchoolProfile(schoolId, data.profile);
}
