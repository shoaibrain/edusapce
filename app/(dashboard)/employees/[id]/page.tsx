import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { getEmployee } from "@/services/service-employee";



export const metadata: Metadata = {
  title: "Employee",
  description: "Employee Profile Page",
}

export default async function StudentPage({ params }: { params: { id: string } }) {
  const employee = await getEmployee(params.id as string);
  if (!employee) {
    return (
      <p>No Employee found</p>
    )
  }

  return (
    <>
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
              <Link href= {`/school/${params.id}/employees`}>Employees</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage> {`${employee.firstName} ${employee.lastName}`}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-8 md:px-6">
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem >
             <Link href={`/employees/${employee.id}/settings`}>
              Profile Settings
             </Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
            Option
            </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
         <div className="flex w-full flex-col items-center justify-between rounded-lg p-6 shadow-md md:flex-row">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage alt="Student Name" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{`${employee.firstName} ${employee.lastName}`}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{`Contact number: ${employee.phone}`}</p>
                  <p className="text-gray-500 dark:text-gray-400">{`Email: ${employee.email}`}</p>
                </div>
              </div>
        </div>
        <section className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div className=" rounded-lg p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold"> Employee Work insights</h3>
          </div>
          <div className="rounded-lg p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Classes</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <p>Overview of class grades being taught by this employee</p>
            </ul>
          </div>
        </section>
      </div>
    </>
  );

}
