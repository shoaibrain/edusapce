"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
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

import { toast } from "@/components/ui/use-toast"
import { School } from "@prisma/client"
import React from "react"

interface SchoolGeneralSettingsProps extends React.HTMLAttributes<HTMLFormElement> {
  school: School;
}

// const API_URL='https://project-eduspace.vercel.app/api/v1'

const academicSettingPatchSchema = z.object({
  academic_year: z
    .string()
    .min(5, {
      message: "School current academic year. academic year must be at least 5 characters, starting with year yyyy-schoolterm",
    })
    .max(30, {
      message: "School name must not be longer than 30 characters.",
    }).optional(),
    class_grades: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
    school_terms: z
    .array(
      z.object({
        value: z.string(),
      })
    )
})

type SchoolAcademicFormValues = z.infer<typeof academicSettingPatchSchema>


// This can come from your database or API.
// This can come from your database or API.
const defaultValues: Partial<SchoolAcademicFormValues> = {
  academic_year: "2021-2022",
  class_grades: [{ value: "Kinder" }, { value: "One" }, { value: "Two" }],
  school_terms: [{ value: "Term 1" }, { value: "Term 2" }, { value: "Term 3" }],
}


export function SchoolAcademicSettingsForm() {


  const form = useForm<SchoolAcademicFormValues>({
    resolver: zodResolver(academicSettingPatchSchema),
    defaultValues,
    mode: "onChange",
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const { fields: current_classes, append: appendClassGrade } = useFieldArray({
    name: "class_grades",
    control: form.control,
  });

  const { fields: current_school_terms, append: appendSchoolTerm } =
    useFieldArray({
      name: "school_terms",
      control: form.control,
    });

  async function onSubmit(data: SchoolAcademicFormValues) {
    setIsSaving(true)
    const response = await fetch(`/school/123}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    setIsSaving(false)
    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: `Failed to update guardian information.`,
    //     variant: "destructive",
    //   })
    // }

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
              <div  className="sm:col-span-4">
                <FormField
                  control={form.control}
                  name="academic_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year</FormLabel>
                      <FormControl>
                        <Input placeholder="school academic year" {...field} />
                      </FormControl>
                      <FormDescription>
                        Each school academic year can be
                        given a name for easy identification.
                        eg. academic_year_2023
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
                {current_classes.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`class_grades.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Class Grade Level
                        </FormLabel>
                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                          Add class grade level
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => appendClassGrade({ value: "" })}
                >
                  Add Class Grade
                </Button>
              </div>
              <div className="sm:col-span-3">
                {current_school_terms.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`school_terms.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          School Term
                        </FormLabel>
                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                          School Terms eg. Term 1, Term 2, Term 3
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => appendSchoolTerm({ value: "" })}
                >
                  Add School Term
                </Button>
              </div>
        </div>
        <Button type="submit">Update Academic Settings</Button>
      </form>
    </Form>
  )
}
