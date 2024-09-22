import { z } from "zod";
import { gradeLevelPatchSchema } from "@/lib/validations/academics";
import { patchGradeLevel } from "@/services/service-school";
import { NextRequest } from "next/server";



const routeContextSchema = z.object({
  params: z.object({
    id: z.string() // YearGradeLevelId
  }),
});

// patch existing grade_level
export async function PATCH(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {params } = routeContextSchema.parse(context);
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action');
    const json = await request.json();

    await handleUpdates(params.id as string, action, json);
    return new Response(null, { status: 200 });
  } catch(error) {
    console.log(`Failed to update school: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

// Handle patch on grade_level
async function handleUpdates(id: string,
  action: string | null,
  payload: any) {
    try{
    if (action === 'grade-patch') { // create grade_level in school
      await handleSchoolGradeLevelPatch(payload.schoolId, payload.grade);
      console.log(`Patch applied on ${JSON.stringify(payload)}`);
    }
  } catch(error){
    console.log(`Failed to patch gradeLevel for school ${payload.schoolId}
                 with payload data: ${JSON.stringify(payload)}
      `);
  }
}

async function handleSchoolGradeLevelPatch(schoolId: string,
   data: any) {
  // patch in existig grade level.
  // patch include operations like enrollment, class periods and subject related
  // changes for that grade
  const gradeLevelPatchData = gradeLevelPatchSchema.parse(data.grade);
  await patchGradeLevel(schoolId, gradeLevelPatchData);
}
