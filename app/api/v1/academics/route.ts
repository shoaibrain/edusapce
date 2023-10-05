import { ca } from "date-fns/locale";
import { get } from "http";
import * as z from "zod"

export async function GET () {
  try {
    // const classgrades = await getClassGrades();
    // const attendence = await getAttendence();
    // const subjects = await getSubjects();
    // const results = await getResults();
    const academics = {
      // classgrades,
      // attendence,
      // subjects,
      // results,
    };
    return new Response(JSON.stringify(academics), { status: 200 })

  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
