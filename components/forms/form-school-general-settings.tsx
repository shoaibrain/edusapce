"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import React from "react"
import { Icons } from "../icons"
import { School } from "@prisma/client"
import { SchoolUpdateInput, schoolUpdateSchema } from "@/lib/validations/school"
import { schoolUpdate } from "@/lib/actions/school-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SchoolProfileSettingsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  school: any;
}

export function SchoolGeneralSettingsForm({
  school,
  className,
  ...props
}: SchoolProfileSettingsFormProps) {
  const form = useForm<SchoolUpdateInput>({
    resolver: zodResolver(schoolUpdateSchema),
    mode: "onChange",
    defaultValues: {
      id: school.id,
      tenantId: school.tenantId,
      name: school.name,
      address: school.address,
      phone: school.phone,
      email: school.email ?? undefined,
      website: school.website ?? undefined,
      schoolType: school.schoolType ?? undefined,
      description: school.description ?? undefined,
    },
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: SchoolUpdateInput) {
    setIsSaving(true)
    try {
      const response = await schoolUpdate(data);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to update school information");
      }
      toast({
        description: "Your school information has been updated.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating school:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
        {...props}
      >
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="School name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your school name as registered
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
                      className="resize-none"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Your school physical address
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
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormDescription>
                    Your school email
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
                  <FormLabel>School Phone</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormDescription>
                    Your school phone number
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
                  <FormLabel>School Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Your school website URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="schoolType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>School Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="charter">Charter</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of your school
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description of your school (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className={cn(buttonVariants())}
          disabled={isSaving}
        >
          {isSaving && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          <span>Save Changes</span>
        </Button>
      </form>
    </Form>
  )
}
