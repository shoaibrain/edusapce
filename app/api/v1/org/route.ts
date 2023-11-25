
import { schoolTermCreateSchema, schoolYearCreateSchema } from "@/lib/validations/org";
import { createResource } from "@/services/service-academic";
import * as z from "zod"

// Setup school year for the organization
export async function POST(request: Request) {
  try {
    const json = await request.json();
    // extract school_year, school_term
    const school_year = json.school_year;
    const school_term = json.school_term;

    const validated_school_year = schoolYearCreateSchema.parse(school_year);
    const validated_school_term = schoolTermCreateSchema.parse(school_term);
    console.log(`school_year: ${JSON.stringify(validated_school_year)}`)
    console.log(`school_term: ${JSON.stringify(validated_school_term)}`)

    // create school year
    const newSchoolYear = await createResource('SchoolYear', validated_school_year);
    // create school term
    const newSchoolTerm = await createResource('SchoolTerm', validated_school_term);

    return new Response(JSON.stringify([newSchoolYear, newSchoolTerm]), {
      status: 201,
      headers: { 'Location': `/school-years/` },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: error.issues }), { status: 422 });
    }

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

// // Create Org
// export const function POST(request: Request) {

// }
