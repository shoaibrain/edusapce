import prisma from "@/lib/db";
import { employeeCreateSchema } from "@/lib/validations/employee";
import { getEmployees } from "@/services/service-employee";
import { NextResponse } from "next/server";
import { z } from "zod";


export async function GET(request: Request) {
  try {
    const employees = await getEmployees();
    return new NextResponse(JSON.stringify(employees), { status: 200 })
  } catch (error) {
    return new NextResponse(null, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = employeeCreateSchema.parse(json);
    let dob  = new Date(body.birthDate);
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        birthDate: dob,
        gender: body.gender,
        ssn: body.ssn,
        department: body.department,
      }
    })
    return new Response(JSON.stringify(newEmployee))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
