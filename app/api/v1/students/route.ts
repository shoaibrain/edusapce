import * as z from "zod"
import { getStudents, postStudent } from "@/services/service-student"
import {  studentCreateSchema } from "@/lib/validations/student"
import { logger } from "@/logger";

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
      let dob = new Date(json.birthDate);
      json.birthDate = dob;
      const body = studentCreateSchema.parse(json);
      const newStudent = await postStudent(body);
      return new Response(JSON.stringify(newStudent), { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
}
