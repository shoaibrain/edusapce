"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Student } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { studentPatchSchema } from "@/lib/validations/student"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {  buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue } from "./ui/select"

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: Student;
}
type FormData = z.infer<typeof studentPatchSchema>

//TODO: patch through webUI is not working, works with postman
export function StudentEditForm({ student, className, ...props }: StudentEditFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentPatchSchema),
    defaultValues: {
      firstName: student?.firstName,
      middleName: student?.middleName || "",
      lastName: student?.lastName,
      gender: student?.gender,
      email: student?.email || "",
      phone: student?.phone || "",
      currentGrade: student?.currentGrade || "",
      enrollmentStatus: student?.enrollmentStatus || "",
    }
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`${process.env.API_URL}/api/students/${student.id}`,{
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setIsSaving(false)
    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Failed to update student: ${response?.statusText}`,
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
                 {errors?.firstName && (
                    <p className="px-1 text-xs text-red-600">{errors.firstName.message}</p>
                  )}
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
                {errors?.middleName && (
              <p className="px-1 text-xs text-red-600">{errors.middleName.message}</p>
                )}
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
                {errors?.lastName && (
              <p className="px-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="gender">
                  Gender
                </Label>
                <Select>
                <SelectTrigger className="w-[350px]">
                    <SelectValue
                     placeholder= { student.gender? `${student.gender}`: `Select gender`}
                     />
                </SelectTrigger>
                <SelectContent {...register("gender")}>
                    <SelectGroup>
                    <SelectLabel>Birth Gender</SelectLabel>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
                 {errors?.gender && (
                   <p className="px-1 text-xs text-red-600">{errors.gender.message}</p>
                 )}
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
                {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
                )}
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
                {errors?.phone && (
                   <p className="px-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
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
                {errors?.enrollmentStatus && (
                    <p className="px-1 text-xs text-red-600">{errors.enrollmentStatus.message}</p>
                )}
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
                {errors?.currentGrade && (
                    <p className="px-1 text-xs text-red-600">{errors.currentGrade.message}</p>
                )}
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
