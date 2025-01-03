"use client"

import * as React from "react"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/userAuthSchema"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({resolver: zodResolver(userAuthSchema),})
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function loginUser(data: FormData) {
    setIsLoading(true);
    try {
      const signInResult = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false, // Prevent automatic redirection
      });

      setIsLoading(false);

      if (!signInResult?.ok) {
        // Handle errors here
        if (signInResult?.error === 'Signin') {
          // Likely incorrect email or password
          toast({
            title: "Invalid Credentials",
            description: "The email or password you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        } else {
          // Handle other potential errors
          console.error('Unexpected error:', signInResult?.error);
          toast({
            title: `Failed to Login`,
            description: `error: ${signInResult?.error}`,
            variant: "destructive",
          });
        }
      } else {
        // Login successful (handled below)
        toast({
          title: "Logged in successfully",
        });
        // Redirect or handle further logic (optional)
        router.push('/dashboard'); // Example redirection
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: "An unexpected error occurred.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(loginUser)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label  htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {/* BUG: Error doesnt show up for this filed */}
            { errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
    </div>
  )
}
