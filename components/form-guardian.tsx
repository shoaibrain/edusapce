
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"
interface GuardianFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardian: Guardian;
}
type FormData = z.infer<typeof guardianSchema>

export function GuardianInfoForm( {className, ...props}: GuardianFormProps) {
  const router = useRouter()
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
      }, 6000);
    setIsSaving(false)

    if (!responseStatus) {
      return toast({
        title: "Something went wrong.",
        description: "Failed to add parent. Please try again.",
        variant: "destructive",
      })
    }

    toast({
        title: "Success",
        description: `A parent has been added.\n ${JSON.stringify(data)}`,
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
            <div className="sm:col-span-3">
                <Label  htmlFor="firstName">
                  FirstName
                </Label>
                <Input
                id="firstName"
                className="w-[350px]"
                size={32}
                {...register("firstName")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="lastName">
                lastName
                </Label>
                <Input
                id= "lastName"
                className="w-[350px]"
                size={32}
                {...register("lastName")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="email">
                email
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
                phone
                </Label>
                <Input
                id= "phone"
                className="w-[350px]"
                size={32}
                {...register("phone")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="address">
            address
                </Label>
                <Input
                id= "address"
                className="w-[350px]"
                size={32}
                {...register("address")}
                />
            </div>
            <div className="sm:col-span-3">
            <Label  htmlFor="guardianType">
            Guardian Type
                </Label>
                <Select>
                <SelectTrigger className="w-[350px]">
                    <SelectValue placeholder="Select a guardian type" />
                </SelectTrigger>
                <SelectContent {...register("guardianType")}>
                    <SelectGroup>
                    <SelectLabel>Guardian Type</SelectLabel>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>

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
