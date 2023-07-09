
import prisma from '@/lib/db';
import { NextResponse, NextRequest } from "next/server"

export async function GET (req: NextRequest) {

    try {
        const students = await prisma.student.findMany();
        return new NextResponse(JSON.stringify(students))
      } catch (error) {
        return new NextResponse(null, { status: 500 })
      }
}

export async function POST(request: Request){
  const body = await request.json()
  let { firstName,
          middleName, 
          lastName, 
          birthDate,
          gender,
          nationality,
          email, 
          phone, 
          address } = body
  
    // meh meh meh meh
    birthDate = new Date(birthDate);

  if (!firstName || !lastName || !birthDate || !gender || !address) {
    return new NextResponse("Missing Fields", { status: 400 })
  }
  
  const student = await prisma.student.create({
    data: {
      firstName,
      middleName,
      lastName,
      birthDate,
      gender,
      nationality,
      email,
      phone,
      address,
    },
  })

  return NextResponse.json(student)
}