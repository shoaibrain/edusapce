"use client"

import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { func } from "prop-types"

const schoolSettingsSchema = z.object({
  schoolProfile: z.object({
    name: z.string().min(2, {
      message: "School name must be at least 2 characters.",
    }),
    schoolId: z.string().optional(),
    address: z.string().min(2, {
      message: "School address must be at least 2 characters.",
    }),
    phone: z.string().min(2, {
      message: "School phone must be at least 2 characters.",
    }),
    email: z.string().email(),
    website: z.string().url({ message: "Please enter a valid URL." }).optional(),
  }),
  schoolYear: z.object({
    name: z.string().min(2, {
      message: "School academic year name must be at least 2 characters.",
    }),
    startDate: z.date(),
    endDate: z.date(),
    allocatedBudget: z.number(),
    expenses: z.number(),
    registrationClose: z.date(),
  }),
  })
  const schoolTermSchema = z.object({
    name: z.string().min(2, {
      message: "School term name must be at least 2 characters.",
    }),
    startDate: z.date(),
    endDate: z.date(),
    registrationClose: z.date(),
  })

  type schoolSettingsFormValues = z.infer<typeof schoolSettingsSchema>

  export function SchoolSettings () {
    const form = useForm<schoolSettingsFormValues>({
      resolver: zodResolver(schoolSettingsSchema),
      defaultValues: {
        schoolProfile: {
          name: "",
          schoolId: "",
          address: "",
          phone: "",
          email: "",
          website: "",
        },
        schoolYear: {
          name: "",
          startDate:new Date(),
          endDate: new Date(),
          allocatedBudget: 1,
          expenses: 0,
          registrationClose: new Date(),
        },
      },
      mode: "onChange",
    })
    function onSubmit (data: schoolSettingsFormValues) {
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

        </form>
      </Form>
    )
  }


