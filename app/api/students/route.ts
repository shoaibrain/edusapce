import { getServerSession } from "next-auth/next"
import * as z from "zod"
import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getStudents } from "@/services/service-student"

const studentCreateSchema = z.object({
  firstName: z.string().min(2).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(2).max(20),
  birthDate: z.string(),
  gender: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})
export async function GET(){
  try {
    const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 })
    // }
    const students = await getStudents();
    return new Response(JSON.stringify(students), { status: 200 })
  
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}
export async function POST(request: Request) {
    try {
      const json = await request.json();
      const body = studentCreateSchema.parse(json);
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
      return new Response(JSON.stringify(newStudent))

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
}