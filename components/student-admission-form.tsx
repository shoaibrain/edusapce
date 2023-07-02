"use client"
import * as React from "react"

import { useRouter } from "next/navigation"

import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {ZodType, z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast"
import { studentAdmissionFormSchema } from "@/lib/validations/admissionFormSchema";
import axios from "axios";

interface StudentAdmissionFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof studentAdmissionFormSchema>

export function StudentAdmissionForm({className, ...props}:StudentAdmissionFormProps ) {
    const router = useRouter()
    
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver: zodResolver(studentAdmissionFormSchema)})

    async function registerStudent(data: FormData) {
        try {
            const response = await axios.post('/api/students', data);
            console.log(response);
            toast({
                title: 'Student Registered successfully',
                variant: "default",
              });
              router.push('/login');
        } catch (error) {
            toast({
                title: 'Error during registration',
                variant: "destructive"
              });
        }
    }

    return (
       <Card className="w-full">
            <form onSubmit={handleSubmit(registerStudent)}>
                <div className="space-y-12 p-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h4 className="leading-2 text-base font-semibold text-gray-600">Student Information</h4>
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                            <Label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </Label>
                            <div className="mt-2">
                                <Input
                                type="text"
                                id="firstName"
                                autoComplete="firstName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("firstName")}
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                            </div>
                            </div>
                            <div className="sm:col-span-2">
                            <Label htmlFor="middleName" className="block text-sm font-medium leading-6 text-gray-900">
                                Middle name
                            </Label>
                            <div className="mt-2">
                                <Input
                                type="text"
                                {...register("middleName")}
                                id="middleName"
                                placeholder="Optional"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>
                            <div className="sm:col-span-2">
                            <Label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </Label>
                            <div className="mt-2">
                                <Input
                                type="text"
                            {...register("lastName")}
                                id="lastName"
                                autoComplete="lastName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                            </div>
                            </div>

                            <div className="sm:col-span-2">
                            <Label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Birth Date
                            </Label>
                            <div className="mt-2">
                                {/* BUG: string is beign received instead of date */}
                                <Input
                                type="date"
                                {...register("birthDate", {valueAsDate: true})}
                                id="birthDate"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                            </div>
                            </div>
                            <div className="sm:col-span-2">
                            <Label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </Label>
                            <div className="mt-2">
                                <select
                                id="gender"
                                {...register("gender")}
                                autoComplete="gender-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                <option>Male</option>
                                <option>Female</option>
                                <option>others</option>
                                </select>
                                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                            </div>
                            </div>
                            <div className="sm:col-span-2">
                            <Label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                Nationality
                            </Label>
                            <div className="mt-2">
                                <Input
                                type="text"
                                {...register("nationality")}
                                id="nationality"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.nationality &&  <p className="text-red-500">{errors.nationality.message}</p>}
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                                <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </Label>
                                <div className="mt-2">
                                    <Input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email &&  <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <Label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                </Label>
                                <div className="mt-2">
                                    <Input
                                    id="phone"
                                    {...register("phone")}
                                    type="test"
                                    autoComplete="phone"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phone &&  <p className="text-red-500">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="col-span-full">
                            <Label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Student address
                            </Label>
                            <div className="mt-4">
                                <Input
                                type="text"
                                {...register("address")}
                                id="address"
                                autoComplete="address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.address &&  <p className="text-red-500">{errors.address.message}</p>}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CardFooter>
                    <Button className="w-full" type="submit">Register Student</Button>
                 </CardFooter>
            </form>
        </Card>
    )
}
