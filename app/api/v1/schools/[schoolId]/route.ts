import {
  addGradeLevels,
  deleteSchool,
  getGradeLevelsForSchool,
  getSchool,
  patchSchoolProfile
} from "@/services/service-school";
import { z } from "zod";
import { logger } from "@/logger";
import { NextRequest } from "next/server";
import {
  YearGradeLevelCreateSchema,
} from "@/lib/validations/school";
import { getStudentsForSchool } from "@/services/service-student";
import { getEmployeesForSchool } from "@/services/service-employee";

const routeContextSchema = z.object({
    params: z.object({
      schoolId: z.string(),
    }),
  });

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const searchParams = request.nextUrl.searchParams
    const schoolResource = searchParams.get('schoolResource');

    const response = await handleRead(params.schoolId, schoolResource);

    if (!response) {
      logger.info(`No response found for id ${params.schoolId}`)
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch(error) {
    logger.warn(`Failed to get response: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

async function handleRead(schoolId: string | null, nextResource: string | null) {
  // Note: nextResource is all the next data points that is uniquely
  // identifiable by schoolId
  if (schoolId){
    if (!nextResource) {
      // return default resource
      return await getSchool(schoolId);
    } else if (nextResource === "student") {
      return await getStudentsForSchool(schoolId);
    } else if (nextResource === "employee") {
      return await getEmployeesForSchool(schoolId);
    } else if (nextResource === "year-grade-level") {
      return await getGradeLevelsForSchool(schoolId);
    }
    else {
      return null;
    }
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
    console.log(`The patch action: ${action}`)
    const json = await request.json();
    console.log(`patch payload: ${JSON.stringify(json)}`)
    // Centralized handling for different update types
    // based on payload data,and request-params
    // various patch related operations performed
    // on school, which is an individual data intity
    // with unique identifier
    await handlePatch(params.schoolId as string, action, json);
    return new Response(null, { status: 200 });
  } catch(error) {
    logger.warn(`Failed to update school: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

// Two main type of patch for school,
// patch that is directly on School data table
// & patch on data-points identifiable by schoolId

async function handlePatch(schoolId: string,
  action: string | null,
  payload: any) {
    if (action === 'grade-add') { // create grade_level in school
      await handleSchoolGradeLevelAdd(schoolId, payload);
    } else if (action === 'profile-patch') {
      console.log(`payload in handlePatch: ${payload}`)
      await handleSchoolProfilePatch(schoolId, payload);
    }
}

async function handleSchoolGradeLevelAdd(schoolId: string, data: any) {
  const gradeLevelAddData = YearGradeLevelCreateSchema.parse(data.grade)
  await addGradeLevels(schoolId, gradeLevelAddData);
}

async function handleSchoolProfilePatch(schoolId: string, data: any) {
  console.log(`Payload in handleSchoolProfilePatch: ${JSON.stringify(data)}`)
  await patchSchoolProfile(schoolId, data);
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
