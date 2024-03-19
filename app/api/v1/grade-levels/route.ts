import { YearGradeLevelCreateSchema } from "@/lib/validations/academics";
import { logger } from "@/logger";
import { postYearGradeLevel } from "@/services/service-academic";
import { NextRequest } from "next/server";
import { z } from "zod";


export const POST = async (request: NextRequest) => {

  try {
    const json = await request.json();
    const body = YearGradeLevelCreateSchema.parse(json);
    const yearGradeLevel = await postYearGradeLevel(body);
    return new Response(JSON.stringify(yearGradeLevel), { status: 201 })
  } catch (error) {
    logger.warn(`Failed to create year grade level: ${error.message}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.message), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
