//TODO: this is not working yet, wil throw type error
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { guardianCreateSchema } from '@/lib/validations/guardian';
import { getGuardians } from '@/services/service-guardian';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as z from "zod";

export async function GET (req: Request) {

    try {
      const session = await getServerSession(authOptions)

      // if (!session) {
      //   return new Response("Unauthorized", { status: 403 })
      // }
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
  const newGuardian = await prisma.guardian.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      address: body.address,
      email: body.email,
      profession: body.profession,
      annualIncome: body.annualIncome,
      guardianType: body.guardianType,
    },
  })
  return new Response(JSON.stringify(newGuardian))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
     return new Response(null, { status: 500 })
  }
}