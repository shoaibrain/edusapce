import { employeeCreateSchema } from "@/lib/validations/employee";
import { getEmployees, postEmployee } from "@/services/service-employee";
import { z } from "zod";

export const GET = async () => {
  try {
    const employees = await getEmployees();
    return new Response(JSON.stringify(employees), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const json  = await request.json();
    let dob = new Date(json.birthDate);
    json.birthDate = dob;
    const body = employeeCreateSchema.parse(json);
    const newEmployee = await postEmployee(body);
    return new Response(JSON.stringify(newEmployee), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
