
import { z } from "zod"

import { tenantPatchSchema } from "@/lib/validations/tenant"
import {  getTenant, patchTenant } from "@/services/service-tenant"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)
    if (!session?.user || params.tenantId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }
    // Get the request body and validate it.
    const body = await req.json()
    const payload = tenantPatchSchema.parse(body)
    // Update the user.
   const patchedTenant = patchTenant(params.tenantId, payload);
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
    const session = await getServerSession(authOptions)
    console.log(`session: ${JSON.stringify(session)}`)
    if (!session?.user || params.tenantId !== session?.user.id) {
      console.log(`session.user: ${JSON.stringify(session?.user)}`)
      return new Response(null, { status: 403 })
    }

    // Get the tenant details.
    const tenant = await getTenant(params.tenantId);
    return new Response(JSON.stringify(tenant), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
