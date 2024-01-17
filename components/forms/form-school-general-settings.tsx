"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
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
import { Icons } from "../icons"
import { School } from "@prisma/client"

const SchoolSettingsPatchSchema = z.object({
  id: z.string(),
  name: z
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
  phone: z.string(),
  email: z
    .string({
      required_error: "Please provide a valid email address.",
    })
    .email(),
  website: z.string().url({
    message: "Please provide a valid URL.",
  }),
})

interface SchoolGeneralSettingsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  school: School;
}

type formData = z.infer<typeof SchoolSettingsPatchSchema>


// const API_URL='https://project-eduspace.vercel.app/api/v1'

export function SchoolSettingsForm({
  school,
  ...props
}: SchoolGeneralSettingsFormProps) {
  const form = useForm<formData>({
    resolver: zodResolver(SchoolSettingsPatchSchema),
    mode: "onChange",
    defaultValues: {
      id: school.id,
      name: school.name,
      address: school.address,
      phone: school.phone ,
      email: school.email || "",
      website: school.website || "",
    },
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: formData) {
    setIsSaving(true)
    console.log(`data: ${JSON.stringify(data)}`)
    const response = await fetch(`/api/v1/schools/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        website: data.website,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your name has been updated.",
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="school name" {...field} />
                  </FormControl>
                  <FormDescription>
                    your school name as registered
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
                <FormDescription>
                    your school physical address
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
                <FormLabel>School Email</FormLabel>
                <FormControl>
                  <Input placeholder="yourschool@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  your school email
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
                <FormLabel>School Phone </FormLabel>
                <FormControl>
                  <Input placeholder="contact number" {...field} />
                </FormControl>
                <FormDescription>
                  your school phone number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:col-span-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="School website"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    your school custom domain
                  </FormDescription>
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
