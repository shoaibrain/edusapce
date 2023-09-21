import * as z from "zod"
import prisma from "@/lib/db"
import { getStudents } from "@/services/service-student"
import { studentAdmitSchema } from "@/lib/validations/student"

export async function GET(){
  try {
    const students = await getStudents();
    return new Response(JSON.stringify(students), { status: 200 })

  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(request: Request) {
    try {
      const json = await request.json();
      const body = studentAdmitSchema.parse(json);
      let dob = new Date(body.birthDate);
      const newStudent = await prisma.student.create({
        data: {
            firstName: body.firstName,
            middleName: body.middleName,
            lastName: body.lastName,
            birthDate: dob,
            gender: body.gender,
            address: body.address,
            phone: body.phone,
            email: body.email,
        },
      })
      return new Response(JSON.stringify(newStudent), { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
}
