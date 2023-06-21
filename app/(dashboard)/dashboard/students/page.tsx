import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StudentPage(){
    return (
      <>
        <p>Student Ledger Page</p>
          <Link href="/dashbaord/students/admission" > Admission</Link>

      </>
    )
}