import * as z from "zod"
import prisma from "@/lib/db";
import studentPatchSchema from "@/lib/validations/student";

const routeContextSchema = z.object({
    params: z.object({
      studentId: z.string(),
    }),
  })

  export async function GET (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)
      // Delete the student
      const student = await prisma.student.findUnique({
        where: {
          id: params.studentId as string,
        },
      })

      return new Response(JSON.stringify(student), { status: 200})

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
  export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)
      // Delete the student
      await prisma.student.delete({
        where: {
          id: params.studentId as string,
        },
      })

      return new Response(null, { status: 204, statusText: "Student deleted" })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
  
  export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    try {
      // Validate route params.
      const { params } = routeContextSchema.parse(context)
      console.log(params)
      // Get the request body and validate it.
      const json = await req.json()
      const body = studentPatchSchema.parse(json)
  
      // Update student
      await prisma.student.update({
        where: {
          id: params.studentId,
        },
        data: {
          firstName: body.firstName,
          middleName: body.middleName,
          lastName: body.lastName,
          birthDate: body.birthDate,
          gender:body.gender,
          nationality: body.nationality,
          email: body.email,
          phone: body.phone,
          enrolled: body.enrolled,
          address: body.address,
          currentGrade: body.currentGrade,
        },
      })
      return new Response(null, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      console.log(error)
      return new Response(null, { status: 500 })
    }
  }