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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {useState} from 'react'
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { studentCreateSchema } from "@/lib/validations/student"
import {studentCreate} from "@/lib/actions/student-actions"
// year grade level
interface GradeLevel {
  id: string;
  name: string;
  description?: string;
  levelCategory: string;
  levelOrder: number;
  capacity?: number;
  classRoom?: string;
}

interface StudentAdmissionFormProps extends React.HTMLAttributes<HTMLFormElement> {
  guardianId?: string;
  schoolId: string;
  classGrades?: GradeLevel[]
}

type formData = z.infer<typeof studentCreateSchema>

export function StudentAdmissionForm({
  guardianId,
  schoolId,
  classGrades,
  className,
}: StudentAdmissionFormProps) {

  const form = useForm<formData>({
    resolver: zodResolver(studentCreateSchema),
    mode: "onChange",
    defaultValues: {
      schoolId: schoolId,
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      gender: undefined,
      birthDate: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      yearGradeLevelId: undefined
    }
  });


  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: formData) {
    setIsSaving(true);
    try {
      const response = await studentCreate(data);
      if (response.message !== "ok") {
        console.error(`Error creating student: ${response.message}`);
        return toast({
          title: "Something went wrong.",
          description: `Error: ${response.message}`,
          variant: "destructive",
        });
      }
      toast({
        description: "A new student admitted.",
      });
      router.refresh();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      toast({
        title: "Something went wrong.",
        description: `Error: ${error.message}}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 p-2 sm:grid-cols-6">
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
                        <FormDescription>
                          Enter your legal first name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div  className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          optional
                        </FormDescription>
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
                        <FormDescription>
                          Enter your legal last name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student gender" />
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

                <div  className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mx-2">Birth Date</FormLabel>
                        <FormControl>
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
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                        </FormControl>
                        <FormDescription>
                          Enter date of birth
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
                          Enter your email address| optional
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
                          Enter your contact number
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
                          Enter your home address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  <div className="sm:col-span-3">
                  {classGrades && classGrades.length > 0 && (
                    <FormField
                      control={form.control}
                      name="yearGradeLevelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Grade Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="select student grade level for admission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {classGrades.map((level) => (
                                <SelectItem key={level.id} value={level.id}>
                                  {level.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <div/>
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
            <span>Admit Student</span>
          </button>
      </form>
    </Form>
  )
}
