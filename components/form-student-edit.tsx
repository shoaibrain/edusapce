"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Student } from "@prisma/client"
import { set, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { studentSchema } from "@/lib/validations/user"
import { toast } from "@/components/ui/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {  buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Student;
}

type FormData = z.infer<typeof studentSchema>

export function StudentInfoForm({ student, className, ...props }: StudentEditFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: student.firstName,
      middleName: student.middleName || "",
      lastName: student.lastName,
      email: student.email || "",
      //@ts-ignore
      dob: student.birthDate.toDateString(),
      gender: student.gender,
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    console.log(JSON.stringify(data))
    setIsSaving(true)
    let responseStatus = true;
    setTimeout(() => {
      console.log(JSON.stringify(data));
      responseStatus = false;
    }, 3000);
  setIsSaving(false)

  if (!responseStatus) {
    return toast({
      title: "Something went wrong.",
      description: "Failed to edit Student Profile. Please try again.",
      variant: "destructive",
    })
  }

    toast({
      title: "Success",
      description: `You profile has been updated.\n ${JSON.stringify(data)}`,
      variant: "default",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div className="sm:col-span-2">
                <Label  htmlFor="firstName">
                  FirstName
                </Label>
                <Input
                id="firstName"
                className="w-[250px]"
                size={32}
                {...register("firstName")}
                />
            </div>
            <div className="sm:col-span-2">
                <Label  htmlFor="middleName">
                middleName
                </Label>
                <Input
                id="middleName"
                className="w-[250px]"
                size={32}
                {...register("middleName")}
                />
            </div>
            <div className="sm:col-span-2">
            <Label  htmlFor="lastName">
                last Name
                </Label>
                <Input
                id= "lastName"
                className="w-[250px]"
                size={32}
                {...register("lastName")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="dob">
            Date of Birth
                </Label>
                <Input
                id= "dob"
                className="w-[350px]"
                size={32}
                {...register("dob")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="gender">
                  Gender
                </Label>
                <Select>
                <SelectTrigger className="w-[350px]">
                    <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent {...register("gender")}>
                    <SelectGroup>
                    <SelectLabel>Birth Gender</SelectLabel>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>

            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="email">
                Email
                </Label>
                <Input
                id= "email"
                className="w-[350px]"
                size={32}
                {...register("email")}
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
          <span>Save Changes</span>
        </button>
    </form>
  )
}
