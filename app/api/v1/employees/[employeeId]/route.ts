import { deleteEmployee, getEmployee } from "@/services/service-employee";
import { z } from "zod";

const routeContextSchema = z.object({
    params: z.object({
      employeeId: z.string(),
    }),
  })


  export const GET = async (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) => {
    try {
      const { params } = routeContextSchema.parse(context)
      const employee = await getEmployee(params.employeeId as string);
      if (!employee) {
        return new Response(JSON.stringify("Not Found"), { status: 404 });
      }
      return new Response(JSON.stringify(employee), { status: 200})
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
  }

  export const DELETE = async (
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) => {
    try {
      const { params } = routeContextSchema.parse(context)
      await deleteEmployee(params.employeeId as string);
      return new Response(null, { status: 204, statusText: "Employee deleted" })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
  }
