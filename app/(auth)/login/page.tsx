"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard")
    }
  })
  const loginUser = async (e) => {
    e.preventDefault()
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        console.log(callback.error)
      }
      if (callback?.ok && !callback?.error) {
        console.log("Logged in successfully")
      }
    })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        Back
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <div className={cn("grid gap-6")}>
          <form onSubmit={loginUser} className="space-y-6" method="POST">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label
                  className="ml-1 p-1 text-sm text-muted-foreground"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  disabled={isLoading || isGitHubLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label
                  className="ml-1 p-1 text-sm text-muted-foreground"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  disabled={isLoading || isGitHubLoading}
                />
              </div>
              <button
                className={cn(buttonVariants())}
                disabled={isLoading}
                method="POST"
              >
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
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              setIsGitHubLoading(true)
              signIn("github")
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            Github
          </button>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
