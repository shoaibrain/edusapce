import * as z from "zod"
import prisma from "@/lib/db";

//TODO not tested yet
const routeContextSchema = z.object({
    params: z.object({
      guardianId: z.string(),
    }),
  })

  export async function GET (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
      // Validate the route params.
      const { params } = routeContextSchema.parse(context)

      const guardian = await prisma.guardian.findUnique({
        where: {
          id: params.guardianId as string,
        },
      })

      return new Response(JSON.stringify(guardian), { status: 200})

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
      // Delete the guardian
      await prisma.guardian.delete({
        where: {
          id: params.guardianId as string,
        },
      })

      return new Response(null, { status: 204, statusText: "Guardian deleted" })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
