import { classPeriodCreateSchema } from "@/lib/validations/academics";
import { getClassPeriods, postClassPeriod } from "@/services/service-academic";
import { z } from "zod";


export async function GET() {
  try {
    const classPeriods = await getClassPeriods();
    return new Response(JSON.stringify(classPeriods), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    let st = new Date(json.startTime);
    let et = new Date(json.endTime);
    json.startTime = st;
    json.endTime = et;
    const body = classPeriodCreateSchema.parse(json);
    console.log(`the parsed body is ${JSON.stringify(body)}`)
    const newClassPeriod = await postClassPeriod(body);
    return new Response(JSON.stringify(newClassPeriod), { status: 201 })
  } catch (error) {
    console.log(`The error is ${JSON.stringify(error.issues)}`)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

