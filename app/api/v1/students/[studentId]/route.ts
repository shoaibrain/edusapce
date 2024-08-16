
import * as z from "zod"
import { Prisma } from "@prisma/client";
import { deleteStudent, getStudent, patchStudentProfile } from "@/services/service-student";
import { NextRequest } from "next/server";
import logger from "@/logger";


const routeContextSchema = z.object({
    params: z.object({
      studentId: z.string(),
    }),
  })

export async function GET (
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
){
  try {
    const { params } = routeContextSchema.parse(context)

    const searchParams = req.nextUrl.searchParams
    const schoolId = searchParams.get('schoolId');

    const student = await getStudent(params.studentId as string);
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

// TODO: Soft delete
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

async function handleStudentProfilePatch(
  studentId: string,
  payload: any
 ) {
   try{
  // handle a partial student profile patch operation
  const data: Prisma.StudentUpdateInput = {};
  if (payload.firstName) data.firstName = payload.firstName;
  if (payload.lastName) data.lastName = payload.lastName;
  if (payload.middleName) data.middleName = payload.middleName;
  if (payload.gender) data.gender = payload.gender;
  if (payload.ssn) data.ssn = payload.ssn;
  if (payload.email) data.email = payload.email;
  if (payload.phone) data.phone = payload.phone;
  if (payload.address) data.address = payload.address;
  if (payload.enrollmentStatus) data.enrollmentStatus = payload.enrollmentStatus;
  if (payload.guardians) data.guardians = {
    connect: payload.guardians.map((guardianId: string) => ({ id: guardianId })),
  };

  const patchedStudent =  await patchStudentProfile(studentId , payload);
  return patchedStudent;
    }  catch(error) {
      console.log(`Error in student profile PATCH route: ${error}`)
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map((issue) => {
          return {
            field: issue.path.join('.'),
            message: issue.message,
          };
        });
        return new Response(JSON.stringify(validationErrors), { status: 422 });
      }
    }
 }
