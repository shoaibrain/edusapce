
import { schoolCreateSchema, schoolTermCreateSchema, schoolYearCreateSchema } from "@/lib/validations/school";
import { createResource } from "@/services/service-academic";
import { getSchools, postSchool } from "@/services/service-school";
import { da } from "date-fns/locale";
import * as z from "zod"

export async function GET(){
 try {
    const schools = await getSchools();
    return new Response(JSON.stringify(schools), { status: 200 })
 } catch(error) {
    return new Response(error.message, { status: 500 })
 }
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const body = schoolCreateSchema.parse(json);
    const newSchool = await postSchool(body);
    return new Response(JSON.stringify(newSchool), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
