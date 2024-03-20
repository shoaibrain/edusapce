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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

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

       <h1 className="font-cal text-3xl font-bold dark:text-white">
          School Academics Index Page
        </h1>

        <div>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-white">TODO: provide feedback within the form, which fields failed?</p>
          <code className="text-white">{JSON.stringify(yearGradeLevels, null, 2)}</code>
        </pre>
        </div>

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
                    <GradeLevelAddForm schoolId={params.id} yearGradeLevels={yearGradeLevels}/>
                </DialogContent>
              </Dialog>
        </div>
    </div>
  );
}
