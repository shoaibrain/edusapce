import * as z from "zod"
import { getClass } from "@/services/service-academic";

const routeContextSchema = z.object({
    params: z.object({
      id: z.string(),
    }),
  })

  export async function GET (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ){
    try {
      const { params } = routeContextSchema.parse(context)
      const class_level = await getClass(params.id as string);
      if (!class_level) {
        return new Response(null, { status: 404 });
      }
      return new Response(JSON.stringify(class_level), { status: 200})
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
  }
