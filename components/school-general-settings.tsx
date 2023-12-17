"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"

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

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import React from "react"
import { Icons } from "./icons"

type formData = z.infer<typeof SchoolSettingsPatchSchema>

const SchoolSettingsPatchSchema = z.object({
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
const URL = 'http://localhost:3000/api/v1'
type SchoolFormValues = z.infer<typeof SchoolSettingsPatchSchema>

// This can come from your database or API.
const defaultValues: Partial<SchoolFormValues> = {
  schoolName: "Allen High School",
  email: "example@school.com",
  address: "1234 Main St.",
}


export function SchoolSettingsForm({
}) {
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(SchoolSettingsPatchSchema),
    defaultValues,
    mode: "onChange",
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  function onSubmit(data: SchoolFormValues) {


    console.log("updaing school settings.....")
    setIsSaving(true)
    console.log("done updaing school settings.....")
    setIsSaving(false)

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
      <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="school name" {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    This is your school name. why is this disabled?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="sm:col-span-3">

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
        </div>
        <div className="sm:col-span-3">
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
        </div>
      </div>
      <button
        type="submit"
        className={cn(buttonVariants())}
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
