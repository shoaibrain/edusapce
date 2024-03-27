"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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
import { studentProfilePatchSchema } from "@/lib/validations/student"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { handleStudentProfilePatch } from "@/lib/actions/student-actions"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Student;
}


type FormData = z.infer<typeof studentProfilePatchSchema>

export function StudentSettingsForm({
  student,
  className,
  ...props
}: StudentEditFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(studentProfilePatchSchema),
    mode: "onChange",
    defaultValues: {
      id: student.id,
      firstName: student.firstName,
      middleName: student?.middleName || undefined,
      lastName: student.lastName,
      gender: student.gender,
      // BUG: nationality field is not being updated
      nationality: student?.nationality || undefined,
      ssn: student?.ssn || undefined,
      email: student?.email || undefined,
      phone: student?.phone || undefined,
      address: student?.address,
      enrollmentStatus: student?.enrollmentStatus || undefined,
    }
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = await handleStudentProfilePatch(student.id, data);
    setIsSaving(false)
    if (response.message !== "success") {
      console.log(response.message)
      return toast({
        description: `Failed to update student information.`,
        variant: "destructive",
      })
    }
    toast({
      title:"Successfully!",
      description: "Information has been updated.",
    })

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="m-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                        <FormItem>
                          <FormLabel>Student Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select student gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SSN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Student SSN
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
                      Nationality of student
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
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="enrollmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>enrollmentStatus</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                    enrollmentStatus
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
