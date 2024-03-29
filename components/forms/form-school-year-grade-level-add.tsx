"use client"
import { YearGradeLevelCreateSchema } from "@/lib/validations/academics";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { yearGradeLevelCreate } from "@/lib/actions/school-actions";

interface GradeLevel {
  id: string;
  name: string;
  description?: string;
  levelCategory: string;
  levelOrder: number;
  capacity?: number;
  classRoom?: string;
}

interface ClassGradeLevelAddFormProps extends React.HTMLAttributes<HTMLFormElement> {
  schoolId: string;
  yearGradeLevels: GradeLevel[];
}

type formData = z.infer<typeof YearGradeLevelCreateSchema>

export function GradeLevelAddForm({
  schoolId,
  yearGradeLevels,
  className
}:ClassGradeLevelAddFormProps) {
  const form = useForm<formData>({
    resolver: zodResolver(YearGradeLevelCreateSchema),
    mode: "onChange",
    defaultValues: {
      schoolId: schoolId,
      name: undefined,
      description:undefined,
      levelCategory:undefined,
      levelOrder: undefined,
      capacity: undefined,
      classRoom:undefined
    }
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  async function onSubmit(data: formData) {

    const hasDuplicate = yearGradeLevels.some(
      ({ name, levelOrder, classRoom }) =>
        name === data.name || levelOrder === data.levelOrder || classRoom === data.classRoom
    );
    if (hasDuplicate) {
      toast({
        title: "Something went wrong.",
        description: "Duplicate entry",
        variant: "destructive",
      });
      return;
    }

  setIsSaving(true);
  try {
    const response = await yearGradeLevelCreate(data);
    if(response.message === "ok") {
      toast({
        title: "Success",
        description: "A new year grade level has been added.",
        variant: "default",
      });
    }
  } catch (error) {
    console.error('Error creating YearGradeLevel:', error);
    setIsSaving(false);
    toast({
      title: "Something went wrong.",
      description: `Failed to add yearGradeLevel for ${schoolId}`,
      variant: "destructive",
    });
  } finally {
    setIsSaving(false);
  }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level Name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level description</FormLabel>
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
              name="levelOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>levelOrder</FormLabel>
                  <FormControl>
                    <Input {...field}
                    type="number"
                    onChange={(event) => {
                      const parsedValue = parseInt(event.target.value, 10) || undefined;
                      field.onChange(parsedValue);
                    }}
                    />
                  </FormControl>
                  <FormDescription>
                   Level order of this class grade level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div  className="sm:col-span-3">
            <FormField
              control={form.control}
              name="levelCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>levelCategory</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  levelCategory for this class grade level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div  className="sm:col-span-3">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>capacity</FormLabel>
                  <FormControl>
                    <Input {...field}
                      type="number"
                      onChange={(event) => {
                        const parsedValue = parseInt(event.target.value, 10) || undefined;
                        field.onChange(parsedValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Grade Level ClassRoom Capacity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div  className="sm:col-span-3">
            <FormField
              control={form.control}
              name="classRoom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>classRoom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  classRoom
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
      <span>Save</span>
    </button>
    </form>
  </Form>
  )
}
