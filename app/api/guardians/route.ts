//TODO: this is not working yet, wil throw type error
import prisma from '@/lib/db';
import { NextResponse, NextRequest } from "next/server"
import * as yup from 'yup';

const guardianSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().optional(),
  profession: yup.string().required(),
  annualIncome: yup.number().required(),
  guardianType: yup.string().required(),
  businessAddress: yup.string().optional(),
});

export async function GET (req: NextRequest) {

    try {
        const guardians = await prisma.guardian.findMany();
        return new NextResponse(JSON.stringify(guardians))
      } catch (error) {
        return new NextResponse(null, { status: 500 })
      }
}

export async function POST(request: Request){
  const body = await request.json()
  
  let {firstName,lastName,phone,address,email,profession,annualIncome,guardianType,businessAddress} = body
  
  annualIncome = BigInt(annualIncome)
  
  const guardian = await prisma.guardian.create({
    data: {
      firstName,
      lastName,
      phone,
      address,
      email,
      profession,
      annualIncome,
      guardianType,
      businessAddress,
    },
  })

  return NextResponse.json(guardian)
}