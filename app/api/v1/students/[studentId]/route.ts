import * as z from "zod"
import { studentPatchSchema} from "@/lib/validations/student";
import { Prisma } from "@prisma/client";
import { deleteStudent, getStudent, patchStudent } from "@/services/service-student";


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
    const { params } = routeContextSchema.parse(context)
    const student = await getStudent(params.studentId as string);
    //TODO:  if not found, return 404 not found
    if (!student) {
      return new Response(JSON.stringify("Not Found"), { status: 404 });
    }
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
    const { params } = routeContextSchema.parse(context)
    await deleteStudent(params.studentId as string);
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
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = studentPatchSchema.parse(json);
    // Construct the data object for partial updates.
    const data: Prisma.StudentUpdateInput = {};

    if (body.firstName) data.firstName = body.firstName;
    if (body.middleName && body.middleName !== "") data.middleName = body.middleName;
    if (body.lastName) data.lastName = body.lastName;
    if (body.gender) data.gender = body.gender;
    if (body.nationality) data.nationality = body.nationality;
    if (body.email) data.email = body.email;
    if (body.phone) data.phone = body.phone;
    if (body.address) data.address = body.address;
    if (body.currentGrade) data.currentGrade = body.currentGrade;
    if (body.enrollmentStatus) data.enrollmentStatus = body.enrollmentStatus;
    if (body.guardians) data.guardians = {
      connect: body.guardians.map((guardianId: string) => ({ id: guardianId })),
    };

    await patchStudent(params.studentId as string, data);
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((issue) => {
        return {
          field: issue.path.join('.'),
          message: issue.message,
        };
      });
      return new Response(JSON.stringify(validationErrors), { status: 422 });
    }
    console.log(JSON.stringify(error.message));
    return new Response(null, { status: 500 });
  }
}
