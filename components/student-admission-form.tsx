"use client"
import * as React from "react"

import { useRouter } from "next/navigation"

import { Card, CardHeader,
          CardFooter, CardTitle, 
          CardDescription, CardContent } from "@/components/ui/card"
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
    
    const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2, { message: "first name required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(2, { message: "last name required" }),
    email: z.string().email({ message: "invalid email" }).optional(),
    birthDate: z.date(),
    gender: z.string(),
    nationality: z.string(),
    phone: z.string().min(10, { message: "invalid phone number" }),
    address: z.object({
        street: z.string().min(5, {message: "street name should be 5 character or more"}),
        city: z.string().min(3, {message: "City name should be 3 character or more"}),
        zipCode: z.string().min(3, {message: "Zip code should be 3 character or more"}),
    }),
    guardian: z.object({
        firstName: z.string().min(2, { message: "First name should contain atleast 2 character" }),
        middleName: z.string().optional(),
        lastName: z.string().min(2, { message: "Last name should be 2 character or more" }),
        email: z.string().email({ message: "Enter a valid email" }).optional(),
        phone: z.string().min(10, { message: "Enter a valid phone number" }),
        address: z.object({
            street: z.string().min(5, {message: "Enter a valid street address"}),
            city: z.string().min(3, {message: "Enter a valid city"}),
            zipCode: z.string().min(3, {message: "Enter a valid zip code"}),
        }),
    }),
    enrollmentDetails: z.object({
        gradelevel: z.string().optional(),
        schoolYear: z.string().optional(),
        section: z.string().optional(),
        previousSchool: z.string().optional(),

    })})
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver: zodResolver(schema)})

    async function registerStudent(data: FormData) {
        alert(JSON.stringify(data, null, 4))
    }

    return (
       <Card className="w-full">
            <form onSubmit={handleSubmit(registerStudent)}>
                {/* Student Info */}
                <div className="space-y-12 p-8">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h4 className="leading-2 text-base font-semibold text-gray-600">Student Information</h4>
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
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
                        <label htmlFor="middleName" className="block text-sm font-medium leading-6 text-gray-900">
                            Middle name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("middleName")}
                            id="middleName"
                            placeholder="Optional"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-2">
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
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
                        <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Birth Date
                        </label>
                        <div className="mt-2">
                            {/* BUG: string is beign received instead of date */}
                            <input
                            type="date"
                            {...register("birthDate")}
                            id="birthDate"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                        </div>
                        </div>
                        <div className="sm:col-span-2">
                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                            Gender
                        </label>
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
                        <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                            Nationality
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("nationality")}
                            id="nationality"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.nationality &&  <p className="text-red-500">{errors.nationality.message}</p>}
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
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
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
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
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("address.street")}
                            id="street"
                            autoComplete="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.address?.street &&  <p className="text-red-500">{errors.address.street.message}</p>}
                        </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("address.city")}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.address?.city &&  <p className="text-red-500">{errors.address.city.message}</p>}
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="zipCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("address.zipCode")}
                            id="zipCode"
                            autoComplete="zipCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.address?.zipCode &&  <p className="text-red-500">{errors.address.zipCode.message}</p>}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Guardian Info */}

                {/* Student enrollment Info */}

                <CardFooter>
                    <Button className="w-full" type="submit">Admit Student</Button>
                 </CardFooter>
            </form>
        </Card>
    )
}
