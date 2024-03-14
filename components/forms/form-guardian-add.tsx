"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
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
import { toast } from "@/components/ui/use-toast"
import { guardianCreateSchema } from "@/lib/validations/guardian"
import React from "react"
import { Icons } from "@/components/icons"

interface GuardianAddFormProps extends React.HTMLAttributes<HTMLFormElement> {
  studentId?: string;
  schoolId: string;
}

type formData = z.infer<typeof guardianCreateSchema>


const API_URL='http://localhost:3000/api/v1';

export function GuardianAddForm({
  studentId,
  schoolId,
  className,
  ...props
}: GuardianAddFormProps) {
  const form = useForm<formData>({
    resolver: zodResolver(guardianCreateSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      profession: "",
      annualIncome: "",
      guardianType: "",
    }
  })

  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: formData) {
    console.log(
      `Inside onSubmit for GuardianAddFrom,
      form data: ${JSON.stringify(data)}\n
      student id: ${studentId}
      school id: ${schoolId}`
    )

    if (studentId) {
      console.log(`no student id: ${studentId}`)
      data.students = [studentId];
    }
    data.schoolId = schoolId;

    setIsSaving(true);
    console.log(`Right before fetch: data: ${JSON.stringify(data)}`)

    const response = await fetch(`${API_URL}/guardians`,{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setIsSaving(false);
    if (!response?.ok) {
      console.log(`Error creating guardian for student ${studentId}
      Error message: ${response.statusText}`)
      return toast({
        title: "Something went wrong.",
        description: `Failed to add guardian for ${data.firstName} ${data.lastName}`,
        variant: "destructive",
      })
    }

    toast({
      description: "A new guardian has been added.",
    })
    router.refresh();

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
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
              name="guardianType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a guardian type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Mother">Mother</SelectItem>
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
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      profession|occupation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter yearly income
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
        <span>Save</span>
      </button>
      </form>
    </Form>
  )
}
