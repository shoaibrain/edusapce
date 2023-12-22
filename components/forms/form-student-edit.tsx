"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {  CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import React from "react"

import { Icons } from "@/components/icons"
import {  Student } from "@prisma/client"
import { studentPatchSchema } from "@/lib/validations/student"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {CommandItem } from "../ui/command"

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
] as const


interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Student;
}

type FormData = z.infer<typeof studentPatchSchema>
// TODO: replace with env variable
const URL = 'http://localhost:3000/api/v1'

export function StudentEditForm({
  student,
  className,
  ...props
}: StudentEditFormProps) {


  const form = useForm<FormData>({
    resolver: zodResolver(studentPatchSchema),
    mode: "onChange",
    defaultValues: {
      firstName: student?.firstName,
      middleName: student?.middleName || "",
      lastName: student?.lastName,
      gender: student?.gender,
      nationality: student?.nationality || "",
      email: student?.email || "",
      phone: student?.phone || "",
      address: student?.address,
      enrollmentStatus: student?.enrollmentStatus || "status",
      gradeLevel: student?.gradeLevel || "",
    }
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    console.log(`Valid data: ${JSON.stringify(data, null, 2)}`)
    setIsSaving(true)
    const response = await fetch(`${URL}/students/${student.id}`,{
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setIsSaving(false)
    if (!response?.ok) {
      console.log(response.statusText)
      return toast({
        title: "Something went wrong.",
        description: `Failed to update student information.`,
        variant: "destructive",
      })
    }

    toast({
      title:"Successfully updated",
      description: "Information has been updated.",
    })

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-2">
              <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Gender</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? genders.find(
                                    (gender) => gender.value === field.value
                                  )?.label
                                : "Select gender"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                                {genders.map((gender) => (
                                  <CommandItem
                                    value={gender.label}
                                    key={gender.value}
                                    onSelect={() => {
                                      form.setValue("gender", gender.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        gender.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {gender.label}
                                  </CommandItem>
                                ))}
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Birth gender of student
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Student nationality
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No.</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      contact number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      home address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="sm:col-span-2">
              <FormField
                  control={form.control}
                  name="enrollmentStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Enrollment Status</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? student_enrollment_status.find(
                                    (enrollmentStatus) => enrollmentStatus.value === field.value
                                  )?.label
                                : "status"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                                {student_enrollment_status.map((enrollmentStatus) => (
                                  <CommandItem
                                    value={enrollmentStatus.value}
                                    key={enrollmentStatus.label}
                                    onSelect={() => {
                                      form.setValue("enrollmentStatus", enrollmentStatus.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        enrollmentStatus.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {enrollmentStatus.label}
                                  </CommandItem>
                                ))}
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Student current enrollment status
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div> */}
        </div>
        <button
        type="submit"
        className={cn(buttonVariants(), className)}
        disabled={isSaving}
      >
        {isSaving && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        <span>Save Changes</span>
        </button>
      </form>
  </Form>
  )
}
