import { guardianCreateSchema } from "@/lib/validations/guardian";
import { getGuardians, postGuardian } from "@/services/service-guardian";
import { z } from "zod";

export async function GET() {
  try {
    const guardians = await getGuardians();
    return new Response(JSON.stringify(guardians), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(request:Request) {
  try {
    const json = await request.json();
    const body = guardianCreateSchema.parse(json);
    const newGuardian = await postGuardian(body);
    return new Response(JSON.stringify(newGuardian), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
