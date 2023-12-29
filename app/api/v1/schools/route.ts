
import { schoolCreateSchema } from "@/lib/validations/school";
import { logger } from "@/logger";
import { getSchools, postSchool } from "@/services/service-school";
import * as z from "zod"
import { Logger } from "winston";

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
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    logger.warn(`Failed to create school: ${error.message}`)
    return new Response(null, { status: 500 })
  }
}
