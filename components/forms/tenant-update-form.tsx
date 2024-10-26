//@ts-nocheck
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { tenantUpdate } from "@/lib/actions/tenant-actions"
import { tenantUpdateSchema } from "@/lib/validations/tenant"

interface TenantUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {
  tenant: any
}

type FormData = z.infer<typeof tenantUpdateSchema>

// TODO: fix me, I am not able to update Tenant yet
export function TenantUpdateForm({
   tenant,
   className,
  ...props
}: TenantUpdateFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(tenantUpdateSchema),
    mode: "onChange",
    defaultValues: {
      id: tenant.id,
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone ?? undefined,
      address: tenant.address ?? undefined,
      image: tenant.image ?? undefined,
      password: "",
      confirmPassword: "",
    },
  })

  const password = useWatch({
    control: form.control,
    name: "password",
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    try {
      const response = await tenantUpdate(data);
      if (!response?.success) {
        toast({
          title: "Update failed",
          description: response.message || "Your profile was not updated. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
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
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="size-20">
                <AvatarImage src={tenant.image || "/placeholder.svg"} alt={tenant.name} />
                <AvatarFallback>{tenant.name?.charAt(0) || "IMG"}</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="file" accept="image/*" {...field} value={undefined} onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No.</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your email and password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {password && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <Button
          type="submit"
          className={cn("w-full", className)}
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
