
import prisma from '@/lib/db';
import { NextResponse, NextRequest } from "next/server"

import * as yup from 'yup';

const studentSchema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string().optional(),
  lastName: yup.string().required(),
  birthDate: yup.date().required(),
  gender: yup.string().required(),
  nationality: yup.string().optional(),
  email: yup.string().email().optional(),
  phone: yup.string().optional(),
  address: yup.string().required(),
});

export async function GET (req: NextRequest) {

    try {
        const students =await prisma.student.findMany();
        return new NextResponse(JSON.stringify(students))
      } catch (error) {
        return new NextResponse(null, { status: 500 })
      }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate the request body against the schema
    const validatedData = studentSchema.validate(body);
    
    let {
      firstName,
      middleName,
      lastName,
      birthDate,
      gender,
      nationality,
      email,
      phone,
      address,
    } = body;
    birthDate = new Date(birthDate);
    
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
    });

    return new NextResponse(JSON.stringify(student));
  } catch (error) {
    console.error("Error creating student:", error);
    return new NextResponse("Invalid request data", { status: 400 });
  }
}
