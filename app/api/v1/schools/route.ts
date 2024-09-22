import { schoolCreateSchema } from "@/lib/validations/school";

import { getSchools, postSchool } from "@/services/service-school";
import * as z from "zod"


export async function GET(){
 try {
    const schools = await getSchools();
    return new Response(JSON.stringify(schools), { status: 200 })
 } catch(error) {
    console.log(`Failed to get schools: ${error.message}`)
    return new Response(error.message, { status: 500 })
 }
}


export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const body = schoolCreateSchema.parse(json);
    const newSchool = await postSchool(body);
    console.log(`Created school: ${newSchool.name}`)
    return new Response(JSON.stringify(newSchool), { status: 201 })
  } catch (error) {
    console.log(`Failed to create school: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
