import { deleteEmployee, getEmployee, patchEmployee } from '@/services/service-employee';
import * as z from 'zod'
import { Prisma } from "@prisma/client";
import { EmployeePatchSchema } from '@/lib/validations/employee';
const routeContextSchema = z.object({
  params: z.object({
    employeeId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
){
  try {
    const { params } = routeContextSchema.parse(context)
    const employee = await getEmployee(params.employeeId as string);
    if (!employee) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
    return new Response(JSON.stringify(employee), { status: 200})
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const response = await deleteEmployee(params.employeeId as string);
    if (!response?.ok) {
      return new Response(null, { status: 404, statusText: "Employee not deleted" });
    }
    return new Response(null, { status: 204, statusText: "Employee deleted" })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export const PATCH = async (
  req: Request,
  context: z.infer<typeof routeContextSchema>
) => {
  try {
    const { params } = routeContextSchema.parse(context)
    const json = await req.json()
    const body = EmployeePatchSchema.parse(json)

    // construct data object for partial update
    const data: Prisma.EmployeeUpdateInput = {}
    if (body.firstName) data.firstName = body.firstName
    if (body.middleName) data.middleName = body.middleName
    if (body.lastName) data.lastName = body.lastName
    if (body.phone) data.phone = body.phone
    if (body.email) data.email = body.email
    if (body.address) data.address = body.address
    if (body.birthDate) data.birthDate = body.birthDate.toISOString()
    if (body.department) data.department = body.department

    const employee = await patchEmployee(params.employeeId as string, data)

    return new Response(JSON.stringify(employee), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
