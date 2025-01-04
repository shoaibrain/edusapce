"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import React from "react";
import { Icons } from "@/components/icons";
import {
  ClassPeriodCreateInput,
  classPeriodCreateSchema,
} from "@/lib/validations/school";
import { classPeriodCreate } from "@/lib/actions/academic-actions";

interface ClassPeriodAddFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  yearGradeLevelId: string;
}

export function ClassPeriodAddForm({
  yearGradeLevelId,
  className,
  ...props
}: ClassPeriodAddFormProps) {
  const form = useForm<ClassPeriodCreateInput>({
    resolver: zodResolver(classPeriodCreateSchema),
    mode: "onChange",
    defaultValues: {
      yearGradeLevelId: yearGradeLevelId,
      scheduleType: "recurring",
      recurringSchedule: {
        daysOfWeek: [],
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
      },
      oneTimeSchedule: {
        date: "",
        startTime: "",
        endTime: "",
      },
    },
  });

  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  // Dummy data for teachers
  const teachers = [
    { id: "teacher-1", name: "Alice Smith" },
    { id: "teacher-2", name: "Bob Johnson" },
    { id: "teacher-3", name: "Carol Williams" },
  ];

  const scheduleType = form.watch("scheduleType");
  const selectedDays = form.watch("recurringSchedule.daysOfWeek");

  // Days of the week options
  const daysOfWeekOptions = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  async function onSubmit(data: ClassPeriodCreateInput) {
    setIsSaving(true);
    try {
      console.log("Form data in onSubmit:", data);
      const response = await classPeriodCreate(data);

      if (response.success) {
        toast({
          title: response.message,
        });
        form.reset();
        router.refresh(); // Refresh the current route instead of navigating away
      } else {
        toast({
          title: "Error creating class period",
          description: response.message,
          variant: "destructive",
        });
        if (response.errors) {
          response.errors.forEach((error: any) => {
            form.setError(error.path.join(".") as any, {
              type: "manual",
              message: error.message,
            });
          });
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast({
        title: "An unexpected error occurred",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        {...props}
      >
        <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Class Period Name */}
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Period Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Teacher Selection */}
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Schedule Type Selection */}
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="scheduleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <RadioGroupItem value="recurring" id="recurring" />
                        <FormLabel htmlFor="recurring">
                          Recurring Schedule
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <FormLabel htmlFor="one-time">
                          One-Time Schedule
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Conditionally render schedule fields based on scheduleType */}
          {scheduleType === "recurring" && (
            <>
              {/* Days of the Week */}
              <div className="sm:col-span-6">
                <FormField
                  control={form.control}
                  name="recurringSchedule.daysOfWeek"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days of the Week</FormLabel>
                      <div className="flex flex-wrap gap-4">
                        {daysOfWeekOptions.map((day) => (
                          <FormField
                            key={day.value}
                            control={form.control}
                            name="recurringSchedule.daysOfWeek"
                            render={() => (
                              <FormItem className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes(day.value)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...(field.value || []), day.value]
                                      : field.value?.filter(
                                          (v) => v !== day.value
                                        );
                                    field.onChange(newValue);
                                  }}
                                  id={`day-${day.value}`}
                                />
                                <FormLabel htmlFor={`day-${day.value}`}>
                                  {day.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Start Time */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="recurringSchedule.startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* End Time */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="recurringSchedule.endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Start Date */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="recurringSchedule.startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* End Date */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="recurringSchedule.endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {scheduleType === "one-time" && (
            <>
              {/* Date */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="oneTimeSchedule.date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Start Time */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="oneTimeSchedule.startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* End Time */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="oneTimeSchedule.endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
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
  );
}