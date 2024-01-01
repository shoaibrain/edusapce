"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tenant } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { tenantPatchSchema } from "@/lib/validations/tenant"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "./icons"

interface TenantPatchFormProps extends React.HTMLAttributes<HTMLFormElement> {
  tenant: Pick<Tenant, "id" | "name" | "email" >
}

type FormData = z.infer<typeof tenantPatchSchema>

export function TenantPatchForm({ tenant: tenant, className, ...props }: TenantPatchFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(tenantPatchSchema),
    defaultValues: {
      name: tenant?.name,
      email: tenant?.email,
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/v1/tenants/${tenant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your profile has been updated.",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Manager your profile</CardTitle>
          <CardDescription>
            Following fields can be updated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1 py-8">
            <Label  htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1 py-8">
            <Label  htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="w-[400px]"
              size={32}
              {...register("email")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.email?.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </form>
  )
}
