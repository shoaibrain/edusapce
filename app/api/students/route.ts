import { getServerSession } from "next-auth/next"
import * as z from "zod"
import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getStudents, postStudent } from "@/services/service-student"
import { studentAdmitSchema } from "@/lib/validations/student"

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
      const body = studentAdmitSchema.parse(json);
      const newStudent = await postStudent(body);
      return new Response(JSON.stringify(newStudent), { status: 201 })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
}
