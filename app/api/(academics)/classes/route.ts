import { getServerSession } from "next-auth/next"
import * as z from "zod"
import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getClasses } from "@/services/service-academic"

const classCreateSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().optional()
})

export async function GET(){
  try {
    const classes   = await getClasses();
    return new Response(JSON.stringify(classes), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const body = classCreateSchema.parse(json);
    const newClass = await prisma.cLASS_LEVEL.create({
      data: {
        name: body.name,
        description: body.description
      }
    })
    return new Response(JSON.stringify(newClass), { status: 201 })

  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
