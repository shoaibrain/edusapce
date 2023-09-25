import { gradeLevelCreateSchema } from "@/lib/validations/academics";
import {  getGradeLevels, postGradeLevel } from "@/services/service-academic";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const gradeLevels = await getGradeLevels();
    return new Response(JSON.stringify(gradeLevels), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = gradeLevelCreateSchema.parse(json);
    const newGradeLevel = await postGradeLevel(body);
    return new Response(JSON.stringify(newGradeLevel), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
