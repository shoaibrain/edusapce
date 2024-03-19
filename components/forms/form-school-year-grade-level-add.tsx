"use client"
import { YearGradeLevelCreateSchema } from "@/lib/validations/academics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
      name: "",
      description:"",
      levelCategory:"",
      levelOrder: undefined,// should be number
      capacity: undefined,
      classRoom:""
    }
  })

  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);


  async function onSubmit(data: formData) {
    console.log(`Existing YearGradeLevels: ${JSON.stringify(yearGradeLevels)}`)
    setIsSaving(true);
  // Check for existing name, levelOrder, or classRoom
  // TODO: Handle this gracefully later
  const hasDuplicate = yearGradeLevels.some(
    ({ name, levelOrder, classRoom }) =>
      name === data.name || levelOrder === data.levelOrder || classRoom === data.classRoom
  );
  if (hasDuplicate) {
    setIsSaving(false);
    return toast({
      title: "Duplicate Entry Found",
      description: `A year grade level already exists with matching data.`,
      variant: "destructive",
    });
  }

    const response = await fetch(`/api/v1/grade-levels`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setIsSaving(false);
    if (!response?.ok) {
      console.log(`Error creating YearGradeLevel for school ${schoolId}
      Error message: ${JSON.stringify(response)}`)

      return toast({
        title: "Something went wrong.",
        description: `Failed to add yearGradeLevel for ${schoolId}`,
        variant: "destructive",
      })
    }

    toast({
      description: "A new year grade level has been added.",
    })
    router.refresh();
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
