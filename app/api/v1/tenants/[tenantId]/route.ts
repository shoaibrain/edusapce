import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { tenantNameSchema } from "@/lib/validations/tenant"
import { getSchoolsForTenant, getTenant } from "@/services/service-tenant"
import { te } from "date-fns/locale"

const routeContextSchema = z.object({
  params: z.object({
    tenantId: z.string(),
  }),
})

//BUG: PATCH dont work
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure tenant is authentication a.
    // const session = await getServerSession(authOptions)
    // if (!session?.user || params.tenantId !== session?.user.id) {
    //   return new Response(null, { status: 403 })
    // }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = tenantNameSchema.parse(body)

    // Update the user.
    await prisma.tenant.update({
      where: {
        id: params.tenantId,
      },
      data: {
        name: payload.name,
      },
    })
    return new Response(null, { status: 200 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

// User and Tenant seems to be confusing terms. TODO: handle intuitievly
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure client is authenticated
    // const session = await getServerSession(authOptions)
    // console.log(`session: ${JSON.stringify(session)}`)
    // if (!session?.user || params.tenantId !== session?.user.id) {
    //   console.log(``)
    //   return new Response(null, { status: 403 })
    // }

    // Get the tenant details.
    const tenant = await getTenant(params.tenantId);
    return new Response(JSON.stringify(tenant), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
