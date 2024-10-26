"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Employee } from "@prisma/client"
import { employeePatchSchema } from "@/lib/validations/employee"
import React from "react"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Icons } from "../icons"

interface EmployeeEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  employee: Employee;
}

type FormData = z.infer<typeof employeePatchSchema>;

export function EmployeeProfileEditForm({
  employee,
  className,
  ...props
}: EmployeeEditFormProps) {

  const form = useForm<FormData>({
    resolver: zodResolver(employeePatchSchema),
    mode:"onChange",
    defaultValues: {
     id: employee.id,
     schoolId: employee.schoolId,
     departmentId: employee.departmentId ?? undefined,
     firstName: employee.firstName,
     middleName: employee.middleName ?? undefined,
     lastName: employee.lastName,
     phone: employee.phone ?? undefined,
     email: employee.email ?? undefined,
     address: employee.address ?? undefined,
     birthDate: employee.birthDate ?? undefined,
     gender: employee.gender,
     ssn: employee.ssn ?? undefined
    },
  })

  const [isSaving, setisSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    legal first name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    middle name if you have one
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your legal last name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your contact phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your work email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your current residential address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birth Date</FormLabel>
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
                  <FormDescription>
                    Dob
                  </FormDescription>
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
                  <FormLabel>Employee Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
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
                  <FormDescription>Birth gender of Employee</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your Social Security Number (optional)
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
          <span>Save Changes</span>
        </button>
      </form>
    </Form>
  )
}
