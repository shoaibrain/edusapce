import * as z from "zod"
import prisma from "@/lib/db";
import studentPatchSchema from "@/lib/validations/student";

const routeContextSchema = z.object({
    params: z.object({
      studentId: z.string(),
    }),
  })

  export async function DELETE (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
        //validate route params
        const { params } = routeContextSchema.parse(context)

        await prisma.student.delete({
            where: {
            id: params.studentId as string,
            },
        })
    
        return new Response(null, { status: 204 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
          }

        return new Response(null, { status: 500 })
    }
  }

  export async function PATCH (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
            const { params } = routeContextSchema.parse(context)

            // Get the request body and validate it.
            const json = await req.json()
            const body = studentPatchSchema.parse(json)

                // Update the post.
                // TODO: Implement sanitization for content.
                await prisma.student.update({
                    where: {
                        id: params.studentId as string,
                    },
                    data: body,
                })

            return new Response(null, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
          }

        return new Response(null, { status: 500 })
    }
  }