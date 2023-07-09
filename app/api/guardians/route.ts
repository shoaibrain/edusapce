
import prisma from '@/lib/db';
import { NextResponse, NextRequest } from "next/server"

// TODO: not tested yet
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
  let {   firstName,
          lastName, 
          phone, 
          address, guardianType, businessAddress } = body
  

  if (!firstName || !lastName || !phone || !address || !guardianType) {
    return new NextResponse("Missing Fields", { status: 400 })
  }
  
  const guardian = await prisma.guardian.create({
    data: {
      firstName,
      lastName,
      phone,
      address,
      guardianType,
    },
  })

  return NextResponse.json(guardian)
}