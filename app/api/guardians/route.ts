//TODO: this is not working yet, wil throw type error
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import * as z from "zod"

const guardianCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  email: z.string().email().optional(),
  profession: z.string(),
  annualIncome: z.string().optional(),
  guardianType: z.string(),
  businessAddress: z.string().optional(),
});

export async function GET (req: Request) {

    try {
        const guardians = await prisma.guardian.findMany();
        return new NextResponse(JSON.stringify(guardians))
      } catch (error) {
        console.log(error)
        return new NextResponse(null, { status: 500 })
      }
}

export async function POST(request: Request){
  
  try{
  const json = await request.json()
  const body = guardianCreateSchema.parse(json)
  const guardian = await prisma.guardian.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      address: body.address,
      email: body.email,
      profession: body.profession,
      annualIncome: body.annualIncome,
      guardianType: body.guardianType,
      businessAddress: body.businessAddress,
    },
  })
  return new Response(JSON.stringify(guardian))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

     return new Response(null, { status: 500 })
  }
}