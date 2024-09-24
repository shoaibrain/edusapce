"use client"
import { DepartmentEnum } from "@/types/department";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { schoolDepartmentCreate } from "@/lib/actions/school-actions";
import { DepartmentCreateInput, departmentCreateSchema } from "@/lib/validations/school";

interface SchoolDepartmentToggleFormProps extends React.HTMLAttributes<HTMLFormElement> {
  existingDepartments?: DepartmentEnum[];
  schoolId: string,
}
export function SchoolDepartmentToggleForm({
  // BUG: existing vals are not pre-toggeled in ToggleGroup
  existingDepartments: existingDepartments = [],
  schoolId,
  ...props
}: SchoolDepartmentToggleFormProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<DepartmentEnum[]>(existingDepartments);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const form = useForm<DepartmentCreateInput>({
    resolver: zodResolver(departmentCreateSchema),
    defaultValues: {
      schoolId: schoolId,
      departments: existingDepartments,
    },
  });
  async function onSubmit (data: DepartmentCreateInput){
    setIsSaving(true);
    const selectedDepartments = data.departments.filter(
      (dept) => !existingDepartments.includes(dept)
    );
    if (selectedDepartments.length === 0) {
      setIsSaving(false);
      toast({
        title: "No new departments selected",
        description: "You have already selected all these departments.",
      });
      return;
    }
    const departmentCreateInput: DepartmentCreateInput = {
      schoolId: data.schoolId,
      departments: selectedDepartments,
    };
    try {
      const result = await schoolDepartmentCreate(departmentCreateInput);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
        form.reset();
      }
  } catch(error) {
    console.error('Error creating School Department.', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to add School Department.",
      variant: "destructive",
    });
  } finally {
    setIsSaving(false);
  }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" {...props}>
      <div >
      <FormField
          control={form.control}
          name="departments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Departments</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap gap-2"
                >
                  {Object.values(DepartmentEnum).map((dept) => (
                    <ToggleGroupItem key={dept} value={dept} aria-label={dept} className="px-3 py-2 text-sm">
                      {dept}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormDescription>
                Select departments offered at your school. Click Save when done.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
        <Button
          type="submit"
          className={cn("w-full")}
          disabled={isSaving}
        >
          {isSaving && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Departments'}</span>
        </Button>
      </form>
    </Form>
  );
}
