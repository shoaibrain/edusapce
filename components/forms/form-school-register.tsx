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
import { toast } from "@/components/ui/use-toast"
import React from "react"
import { Icons } from "@/components/icons"
import { schoolCreateSchema } from "@/lib/validations/school"

interface SchoolFormProps extends React.HTMLAttributes<HTMLFormElement> {
  tenantId;
}
type formData = z.infer<typeof schoolCreateSchema>
const URL = 'http://localhost:3000/api/v1';

export function SchoolRegisterForm({
  tenantId: tenantId,
  className,
  ...props
}: SchoolFormProps) {
  const form = useForm<formData>({
    resolver: zodResolver(schoolCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    }
  })
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  async function onSubmit(data: formData) {

    if (tenantId) {
      data.tenants = [tenantId];
    }

    setIsSaving(true);
    const response = await fetch(`${URL}/schools`,{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data)
    })
    setIsSaving(false);
    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Failed to register school`,
        variant: "destructive",
      })
    }

    toast({
      description: "A school has been registered",
    })
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
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
            <div  className="sm:col-span-2">
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
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      web address if any
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
        <span>Register School</span>
      </button>
      </form>
    </Form>
  )
}
