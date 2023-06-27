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
import { userRegisterSchema } from "@/lib/validations/userRegisterSchema";
import axios from "axios";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>

export function UserRegisterForm({className, ...props}:UserRegisterFormProps ) {
  const router = useRouter()
  
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2, { message: "First name should contain atleast 2 character" }),
    lastName: z.string().min(2, { message: "Last name should be 2 character or more" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }).max(15),
    confirmPassword: z.string().min(5).max(15),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver: zodResolver(schema)})
  
  async function registerUser(data: FormData) {
    try {
      const response = await axios.post('/api/register', data);
      console.log(response);
      toast({
        title: 'Registered successfully',
        variant: "default",
      });
      router.push('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'Email already exists') {
          toast({
            title: 'Email is already used to register',
            variant: "destructive",
          });
        } else {
          toast({
            title: 'Error during registration',
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: 'Error during registration',
          variant: "destructive"
        });
      }
    }
  }

  return (
    <Card className="w-full">
       <form  onSubmit={handleSubmit(registerUser)}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your info below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text"  autoCapitalize="none" autoCorrect="off" {...register("firstName")}/>
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" autoCapitalize="none" autoCorrect="off" {...register("lastName")}/>      
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" autoCapitalize="none" autoCorrect="off" autoComplete="email" {...register("email")}/>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>


          <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoCapitalize="none" autoCorrect="off"{...register("password")}/>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" autoCapitalize="none" autoCorrect="off"{...register("confirmPassword")}/>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </CardContent>        

        <CardFooter>
        <Button className="w-full" type="submit">Create account</Button>
      </CardFooter>
      </form>
      </Card>    

  )
}
