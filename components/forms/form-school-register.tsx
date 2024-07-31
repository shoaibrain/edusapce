"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { SchoolCreateInput, schoolCreateSchema } from "@/lib/validations/school"
import { schoolCreate } from "@/lib/actions/school-actions"

interface SchoolRegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  tenantId: string;
}

export function SchoolRegisterForm({
  tenantId,
  className,
  ...props
}: SchoolRegisterFormProps) {
  const form = useForm<SchoolCreateInput>({
    resolver: zodResolver(schoolCreateSchema),
    mode: "onChange",
    defaultValues: {
      tenantId: tenantId,
      name: undefined,
      address: undefined,
      phone: undefined,
      email: undefined,
      website: undefined,
    }
  })
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: SchoolCreateInput) {
    setIsSaving(true);
    try {
      const response = await schoolCreate(data);
      if (!response.success) {
        console.error(`Error creating student: ${response.error?.message}`);
        return toast({
          title: "Something went wrong.",
          description: `Error: ${response.error?.message}`,
          variant: "destructive",
        });
      }
      toast({
        description: "A new School registered.",
      });
      router.refresh();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      toast({
        title: "Something went wrong.",
        description: `Error: ${error.message}}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
