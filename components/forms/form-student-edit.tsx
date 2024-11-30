 //@ts-nocheck
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { studentPatchSchema } from "@/lib/validations/student";
import { studentPatch as studentPatchAction } from "@/lib/actions/student-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

// Year grade level type
interface YearGradeLevelWithStudentCount {
  id: string;
  levelName: string;
  description: string | null;
  levelCategory: string;
  levelOrder: number;
  capacity: number | null;
  classRoom: string | null;
  studentCount: number | null;
}

interface StudentEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  student: {
    id: string;
    schoolId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    email?: string;
    phone?: string;
    address: string;
    yearGradeLevelId?: string;
  };
  classGrades?: YearGradeLevelWithStudentCount[];
}

type FormData = z.infer<typeof studentPatchSchema>;

export function StudentEditForm({
  student,
  classGrades,
  className,
}: StudentEditFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(studentPatchSchema),
    mode: "onChange",
    defaultValues: {
      id: student.id,
      schoolId: student.schoolId,
      firstName: student.firstName,
      middleName: student.middleName ?? undefined,
      lastName: student.lastName,
      gender: student.gender,
      birthDate: student.birthDate,
      email: student.email ?? undefined,
      phone: student.phone ?? undefined,
      address: student.address,
      yearGradeLevelId: student.yearGradeLevelId ?? undefined,
    },
  });

  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    try {
      const response = await studentPatchAction(data);
      if (!response.success) {
        console.error(`Error updating student: ${response.error?.message}`);
        return toast({
          title: "Something went wrong.",
          description: `Error: ${response.error?.message}`,
          variant: "destructive",
        });
      }
      toast({
        description: "Student details updated successfully.",
      });
      router.refresh(); // Refresh the page to reflect changes
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      toast({
        title: "Something went wrong.",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card className="border border-green-300">
      <CardHeader className="border-b border-green-300 p-4">
        <CardTitle>Edit Student Information</CardTitle>
        <CardDescription>Modify the student information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 p-2 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Student first name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Middle Name */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>

                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Last Name */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Student last name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Gender */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Birth Date */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Select the date of birth</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Email */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Email address (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Phone */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Contact number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Home address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Year Grade Level */}
              {classGrades && classGrades.length > 0 && (
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="yearGradeLevelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classGrades.map((level) => (
                              <SelectItem key={level.id} value={level.id}>
                                {level.levelName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Student grade level</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && <Icons.spinner className="mr-2 size-4 animate-spin" />}
              Save Changes
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

