import { getGradeLevel, postGradeLevel } from "@/services/service-academic";

export async function GET(request: Request) {
  try {
    const json = await request.json();
    const { id } = json;
    const gradeLevel = await getGradeLevel(id);
    return new Response(JSON.stringify(gradeLevel), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const newGradeLevel = await postGradeLevel(json);
    return new Response(JSON.stringify(newGradeLevel), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
