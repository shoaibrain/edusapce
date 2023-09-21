
import { guardianCreateSchema } from '@/lib/validations/guardian';
import { getGuardians, postGuardian } from '@/services/service-guardian';
import { NextResponse } from 'next/server';
import * as z from "zod";

export async function GET (req: Request) {

    try {
        const guardians = await getGuardians();
        return new NextResponse(JSON.stringify(guardians),{status:200})
      } catch (error) {
        return new NextResponse(null, { status: 500 })
      }
}

export async function POST(request: Request){

  try{
  const json = await request.json()
  const body = guardianCreateSchema.parse(json)
  const newGuardian = await postGuardian(body);
  return new Response(JSON.stringify(newGuardian))
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(`Error: ${JSON.stringify(error.issues)}`)
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
     return new Response(null, { status: 500 })
  }
}
