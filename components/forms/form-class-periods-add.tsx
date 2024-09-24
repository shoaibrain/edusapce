"use client"
import { ClassPeriodCreateSchema } from "@/lib/validations/academics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { classPeriodCreate } from "@/lib/actions/academic-actions";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface department {
  id: string,
  name: string
}

interface ClassPeriodAddFormProps extends React.HTMLAttributes<HTMLFormElement> {
  gradeLevelId: string;
  existingDepartments?: department[];
}

type FormData = z.infer<typeof ClassPeriodCreateSchema>

const classPeriodTypes = [
  { label: 'Lecture', value: 'lecture' },
  { label: 'Lab', value: 'lab' },
  { label: 'Other', value: 'other' },
];

export function ClassPeriodAdd({
  gradeLevelId,
  existingDepartments: existingDepartments = [],
  className,
  ...props
}: ClassPeriodAddFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(ClassPeriodCreateSchema),
    mode: 'onChange',
    defaultValues: {
      gradeLevelId: gradeLevelId,
      departmentId: undefined,
      name: "",
      classType: undefined,
      description: undefined,
      startTime: "",
      endTime: "",
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    try {
      const newClassPeriod = await classPeriodCreate(data);
      if (newClassPeriod.success) {
        toast({
          title: "Success",
          description: newClassPeriod.message,
          variant: "default",
        });
        form.reset();
      }
    } catch(error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add Class period.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-[80vw]  md:max-w-[60vw]">
      <DialogHeader>
        <DialogTitle>Add New Class Period</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div  className="sm:col-span-3">
            <FormField
              control={form.control}
              name="classType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class period type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classPeriodTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="sm:col-span-3">
              {existingDepartments && existingDepartments.length > 0 && (
                <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select academic department for this class period" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        { existingDepartments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                          {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              )}
            </div>
            <div  className="sm:col-span-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Period description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="time" // HTML5 time input for HH:MM format
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="time" // HTML5 time input for HH:MM format
                        {...field}
                      />
                    </FormControl>
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
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
        </form>
      </Form>
    </DialogContent>
  )
}
