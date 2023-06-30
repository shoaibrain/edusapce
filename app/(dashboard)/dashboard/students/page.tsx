import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Ledger",
  description: "eduSpace Student Ledger",
}


async function getStudents() {
  const res = await fetch('http://localhost:3000/api/students')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function StudentPage(){
   const students = await getStudents();
    console.log(JSON.stringify(students))

    return (
      <>
        <p>Student Ledger Page</p>

          <Link
              href="dashboard/students/admission"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-1/2 px-4"
              )}
            >
              Register Student
            </Link>
         
      </>
    )
}