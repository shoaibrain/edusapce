//@ts-nocheck
"use client"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {  buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import React from "react"
import { useForm } from "react-hook-form"
import { Guardian } from "@prisma/client"
import { guardianSchema } from "@/lib/validations/user"
import { z } from "zod"

interface GuardianFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardian: Guardian;
}
type FormData = z.infer<typeof guardianSchema>

export function GuardianInfoForm( props: GuardianFormProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm<FormData>({
      })
      
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    let responseStatus = true;
    setTimeout(() => {
        console.log(JSON.stringify(data));
        responseStatus = false;
      }, 3000);
    setIsSaving(false)

    if (responseStatus === false) {
      return toast({
        title: "Something went wrong.",
        description: "Failed to add parent. Please try again.",
        variant: "destructive",
      })
    }

    toast({
        title: "Success",
        description: `A parent has been added.\n ${JSON.stringify(data)}`,
        variant: "success",
    })

  }

  return (
    <form
     
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
        <div className="grid gap-4 py-4">

          <div className="grid gap-1">
            <Label  htmlFor="firstName">
              FirstName
            </Label>
            <Input
              id="firstName"
              className="w-[400px]"
              size={32}
              {...register("firstName")}
            />
            <Label  htmlFor="lastName">
              lastName
            </Label>
            <Input
              id= "lastName"
              className="w-[400px]"
              size={32}
              {...register("lastName")}
            />

          </div>
          </div>
          <button
            type="submit"
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save Changes</span>
          </button>
    </form>
  )
}
