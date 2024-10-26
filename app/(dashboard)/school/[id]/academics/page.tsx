
//@ts-nocheck
import { GradeLevelAddForm } from "@/components/forms/form-school-year-grade-level-add";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from "@/components/ui/dialog";

import { getGradeLevelsForSchool } from "@/services/service-school";
import Image from 'next/image'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { Suspense } from "react";
import YearGradeLevelCard from "@/components/year-grade-level-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics",
  description: "School Academics Dashboard",
}

export default async function SchoolAcademicsIndex({
  params,
}: {
  params: { id: string };
}) {
const yearGradeLevels =  await getGradeLevelsForSchool(params.id);

  return (
    <div className="flex flex-col space-y-6">
        <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href= {`/school/${params.id}`}>School</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Academics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
        </Breadcrumb>

        <Suspense
         fallback= {null}
        >
          { yearGradeLevels.length > 0 ?(
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {yearGradeLevels.map((gradeLevel) => (
                  <YearGradeLevelCard key={gradeLevel.id} data={gradeLevel} />
                ))}

              </div>

          ) :(
            <div className="mt-20 flex flex-col items-center space-x-4">
            <h1 className="font-cal text-4xl">No Academic Grade Level found</h1>
            <Image
              alt="No Year Grade Level registred"
              src="https://illustrations.popsy.co/amber/student-with-diploma.svg"
              width={400}
              height={400}
            />
            <p className="text-lg text-stone-500">
              You do not have any gradeLevel registerd.
            </p>
          </div>
          )
          }

        </Suspense>
        <div>
        <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Grade Level</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
                  <DialogHeader>
                    <DialogTitle>Add New Grade Level</DialogTitle>
                    <DialogDescription>
                      Fill out the information for new Grade Level. click Save when done.
                    </DialogDescription>
                  </DialogHeader>
                    <GradeLevelAddForm
                      schoolId={params.id}
                      yearGradeLevels={yearGradeLevels}/>
                </DialogContent>
        </Dialog>
        </div>
    </div>
  );
}
