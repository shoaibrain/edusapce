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
import { guardianCreateSchema } from "@/lib/validations/guardian";

interface GuardianFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardian?: Guardian;
  studentId?: string;
}

type FormData = z.infer<typeof guardianCreateSchema>;

export function GuardianInfoForm({
  guardian,
  studentId,
  className,
  ...props
}: GuardianFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({});

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
      setIsSaving(true);
      const response = await fetch(`/api/guardians`, {
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
          description: "Failed to add parent. Please try again.",
          variant: "destructive",
        });
      }

      // TODO: establish relationship between student and guardian

      toast({
        title: "Success",
        description: "A parent has been added.",
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
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            className="w-[350px]"
            size={32}
            {...register("lastName")}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="w-[350px]"
            size={32}
            {...register("email")}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            className="w-[350px]"
            size={32}
            {...register("phone")}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            className="w-[350px]"
            size={32}
            {...register("address")}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="guardianType">Guardian Type</Label>
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
        <div className="sm:col-span-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            className="w-[250px]"
            size={32}
            {...register("profession")}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="annualIncome">Annual Income</Label>
          <Input
            id="annualIncome"
            className="w-[250px]"
            size={32}
            {...register("annualIncome")}
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
  );
}
