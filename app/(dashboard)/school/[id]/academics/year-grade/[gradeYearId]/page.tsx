import { ClassPeriodAdd } from "@/components/forms/form-class-periods-add";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getYearGradeLevel } from "@/services/service-academic";

import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Year Grade",
  description: "Year Grade Level",
}

export default async function YearGradepage({
  params
}:{
  params: {gradeYearId: string};
}){
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const yearGradeLevelId = decodeURIComponent(params.gradeYearId);
  const classGrade = await getYearGradeLevel(yearGradeLevelId);

  return (
    <>
    <div className="flex flex-col space-y-6">
        <p>`Grade Leve: ${JSON.stringify(classGrade)}`</p>
    </div>
    <div>
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Class Period</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
          <DialogHeader>
            <DialogTitle>Add new class period</DialogTitle>
            <DialogDescription>
              Fill out the information for new Class period. click Save when done.
            </DialogDescription>
          </DialogHeader>
            <ClassPeriodAdd gradeLevelId = {yearGradeLevelId}/>
        </DialogContent>
        </Dialog>
    </div>
    </>
  )
}
