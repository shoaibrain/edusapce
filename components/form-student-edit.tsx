"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Student } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { studentSchema } from "@/lib/validations/user"
import { toast } from "@/components/ui/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {  buttonVariants } from "./ui/button"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Pick<Student, "id" | "firstName" | "middleName" | "lastName">
}

type FormData = z.infer<typeof studentSchema>

export function StudentInfoForm({ student, className, ...props }: StudentEditFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: student?.firstName || "",
      middleName: student?.middleName || "",
      lastName: student?.lastName || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    console.log("Inside OnSubmit")
    setIsSaving(true)

    const response = await fetch(`/api/students/${student.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
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
        <div className="grid gap-4 py-4">

          <div className="grid gap-1">
            <Label  htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              className="w-[400px]"
              size={32}
              {...register("firstName")}
            />
            {errors?.firstName && (
              <p className="px-1 text-xs text-red-600">{errors.firstName.message}</p>
            )}

            <Label  htmlFor="middleName">
              Middle Name
            </Label>
            <Input
              id="middleName"
              className="w-[400px]"
              size={32}
              {...register("middleName")}
            />
            {errors?.middleName && (
              <p className="px-1 text-xs text-red-600">{errors.middleName.message}</p>
            )}

            <Label  htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              className="w-[400px]"
              size={32}
              {...register("lastName")}
            />
            {errors?.lastName && (
              <p className="px-1 text-xs text-red-600">{errors.lastName.message}</p>
            )}

          </div>
          </div>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {/* {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            <span>Save Changes</span>
          </button>
    </form>
  )
}
