"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const SchoolGeneralSettingsSchema = z.object({
  schoolName: z
    .string()
    .min(2, {
      message: "School name must be at least 2 characters.",
    })
    .max(30, {
      message: "School name must not be longer than 30 characters.",
    }),
    address: z
    .string()
    .min(2, {
      message: "School address must be at least 2 characters.",
    }),
  email: z
    .string({
      required_error: "Please provide a valid email address.",
    })
    .email(),

})

type SchoolFormValues = z.infer<typeof SchoolGeneralSettingsSchema>

// This can come from your database or API.
const defaultValues: Partial<SchoolFormValues> = {
  schoolName: "Allen High School",
  address: "1234 Main St.",
  email: "example@school.com"
}

export function SchoolGeneralForm() {
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(SchoolGeneralSettingsSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: SchoolFormValues) {
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
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your school name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="School Mailing Address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Email</FormLabel>
              <FormControl>
                <Input placeholder="Allen@school.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your school email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update School</Button>
      </form>
    </Form>
  )
}
