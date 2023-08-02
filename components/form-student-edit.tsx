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

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Pick<Student, "id" | "firstName">
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
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/students/${student.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.firstName,

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

            <Label  htmlFor="firstName">
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
    </form>
  )
}
