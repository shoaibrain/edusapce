"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Student } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { studentCreateSchema } from "@/lib/validations/user"
import { toast } from "@/components/ui/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {  buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Student;
}

type FormData = z.infer<typeof studentCreateSchema>


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
      birthDate: student.birthDate,
      gender: student.gender,
      address: student.address,
      enrollmentStatus: student.enrollmentStatus || "",
      currentGrade: student.currentGrade || "",
      phone: student.phone || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = await fetch(`http://localhost:3000/api/students/${student.id}`,{
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    setIsSaving(false)
    if (!response.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Failed to update student. Please try again.",
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
              <Label  htmlFor="birthDate">
                Date of Birth
              </Label>
                <Input
                id= "birthDate"
                className="w-[350px]"
                size={32}
                {...register("birthDate")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="gender">
                  Gender
                </Label>
                <Select>
                <SelectTrigger className="w-[350px]">
                    <SelectValue placeholder= { student.gender? `${student.gender}`: `Select gender`} />
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
            <div className="sm:col-span-3">
            <Label  htmlFor="phone">
                Phone
                </Label>
                <Input
                id= "phone"
                className="w-[350px]"
                size={32}
                {...register("phone")}
                />
            </div>
            <div className="sm:col-span-2">
                <Label  htmlFor="enrollmentStatus">
                enrollmentStatus
                </Label>
                <Input
                id="enrollmentStatus"
                className="w-[250px]"
                size={32}
                {...register("enrollmentStatus")}
                />
            </div>
            <div className="sm:col-span-2">
            <Label  htmlFor="currentGrade">
            currentGrade
                </Label>
                <Input
                id= "currentGrade"
                className="w-[250px]"
                size={32}
                {...register("currentGrade")}
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
