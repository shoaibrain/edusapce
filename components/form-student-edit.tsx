"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { studentSchema } from "@/lib/validations/user"
import { toast } from "@/components/ui/use-toast"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
    // do better here
  user: Pick<User, "id" | "name">
}

type FormData = z.infer<typeof studentSchema>

export function StudentInfoForm({ user, className, ...props }: StudentEditFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: user?.name || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/students/${user.id}`, {
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
        
    </form>
  )
}
