"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader,
          CardFooter, CardTitle,
          CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast"
import { userRegisterSchema } from "@/lib/validations/userRegisterSchema";
import { z } from "zod";


interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>

export function UserRegisterForm({className, ...props}:UserRegisterFormProps ) {
  const router = useRouter()

  const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver: zodResolver(userRegisterSchema)})

  async function registerUser(data: FormData) {
    try {
      const response = await fetch("/api/auth/register")

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
          title: 'Failed to register user. contact admin',
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
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text"  autoCapitalize="none" autoCorrect="off" placeholder="firstname lastname" {...register("name")}/>
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
