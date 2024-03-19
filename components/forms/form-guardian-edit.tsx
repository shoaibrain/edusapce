"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { guardianPatchSchema } from "@/lib/validations/guardian"
import React from "react"

import { Icons } from "@/components/icons"
import { Guardian } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CommandItem } from "../ui/command"

const guardianTypes = [
    {label:"Father", value:"Father"},
    {label:"Mother", value:"Mother"},
    {label: "Other", value:"Other"}
] as const;

interface GuardianEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardian: Guardian;

}
type FormData = z.infer<typeof guardianPatchSchema>

export function GuardianEditForm({
  guardian,
  className,
  ...props
}: GuardianEditFormProps) {

  const form = useForm<FormData>({
    resolver: zodResolver(guardianPatchSchema),
    mode: "onChange",
    defaultValues: {
      firstName: guardian?.firstName,
      lastName: guardian?.lastName,
      guardianType: guardian?.guardianType || undefined,
      email: guardian?.email || undefined,
      phone: guardian?.phone || undefined,
      address: guardian?.address || undefined,
      profession: guardian?.profession || undefined,
      annualIncome: guardian?.annualIncome || undefined
    }
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const response = await fetch(`/api/v1/guardians/${guardian.id}`,{
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
        description: `Failed to update guardian information.`,
        variant: "destructive",
      })
    }
    toast({
      title:"Successfully updated",
      description: "Information has been updated.",
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-2">
            <FormField
                  control={form.control}
                  name="guardianType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Guardian Type</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? guardianTypes.find(
                                    (guardianType) => guardianType.value === field.value
                                  )?.label
                                : "Select guardian type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                                {guardianTypes.map((guardianType) => (
                                  <CommandItem
                                    value={guardianType.label}
                                    key={guardianType.value}
                                    onSelect={() => {
                                      form.setValue("guardianType", guardianType.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        guardianType.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {guardianType.label}
                                  </CommandItem>
                                ))}
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Guardian Type
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
            />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No.</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      contact number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      home address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      profession|occupation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter yearly income
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
  </Form>
  )
}
