"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import {  Button, buttonVariants } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"
import { Icons } from "../icons"
import { createEmployeeSchema } from "@/lib/validations/employee"
import { EmployeeCreate } from "@/lib/actions/employee-action"
import { toast } from "../ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


interface department {
  id: string,
  name: string
}

interface EmployeeAdmissionFormProps extends React.HTMLAttributes<HTMLFormElement> {
  schoolId: string;
  tenantId: string;
  existingDepartments?: department[];
}


type formData = z.infer<typeof createEmployeeSchema>

export function EmployeeAdmissionForm({
  schoolId,
  tenantId,
  existingDepartments: existingDepartments = [],
  className,
  ...props
}: EmployeeAdmissionFormProps) {
  const form = useForm<formData>({
    resolver: zodResolver(createEmployeeSchema),
    mode: "onChange",
    defaultValues: {
      schoolId: schoolId,
      tenantId: tenantId,
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      birthDate: undefined,
      gender: undefined,
      ssn: undefined,
      departmentId: undefined
    }
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: formData) {
    console.log(JSON.stringify(data, null, 2))
    setIsSaving(true);
    try{
      const response = await EmployeeCreate(data);
      if(response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });
        form.reset();
      }
    } catch(error){
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add Employee.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
  <Card className="border border-blue-300">
    <CardHeader className="border-b border-blue-300 p-4">
        <CardTitle>Employee Application Form</CardTitle>
        <CardDescription>Fill in the below information to get started with employee registration.</CardDescription>
    </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      first name
                    </FormDescription>
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
                    <FormDescription>
                      middle name
                    </FormDescription>
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
                    <FormDescription>
                      last name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mx-2">Birth Date</FormLabel>
                        <FormControl>
                        <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                        </FormControl>
                        <FormDescription>
                          Enter date of birth
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

            <div className="sm:col-span-2">
              {existingDepartments && existingDepartments.length > 0 && (
                <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select department for employee" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        { existingDepartments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                          {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              )}
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select birth gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="sm:col-span-3">
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
                      Enter your email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
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
                      Enter your government id
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
                      Enter your contact number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-4">
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
                      Enter your mailing address
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
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        )}
        <span>Add New Employee</span>
      </button>
      </form>
    </Form>
    </CardContent>
    </Card>
  )
}
