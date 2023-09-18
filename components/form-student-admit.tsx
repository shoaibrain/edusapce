"use client";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import React from "react";
import { useForm } from "react-hook-form";
import { Guardian } from "@prisma/client";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "formik";

interface StudentAdmissionFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardianId?: string;
}
const studentCreateSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  birthDate: z.date(),
  gender: z.string().min(2, { message: "Gender is required" }),
  address: z.string().min(2, { message: "Address is required" }),
});
type FormData = z.infer<typeof studentCreateSchema>;

export function StudentAdmissionForm({
  guardianId,
  className,
  ...props
}: StudentAdmissionFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentCreateSchema),
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
      setIsSaving(true);
      console.log(` the form data is: ${JSON.stringify(data)}`)
      const response = await fetch(`${process.env.API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSaving(false);

      if (!response.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Failed to add student. Please try again.",
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "A student has been added.",
        variant: "default",
      });
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            className="w-[350px]"
            size={32}
            {...register("firstName")}
          />
          {errors?.firstName && (
          <p className="px-1 text-xs text-red-600">{errors.firstName.message}</p>
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
  );
}
