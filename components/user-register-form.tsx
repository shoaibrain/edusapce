"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function UserRegisterForm() {
  const router = useRouter()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async (e) => {
    e.preventDefault()
    axios
      .post("/api/register", data)
      .then(() => {
        console.log("User has been registered")
        router.push("/login")
      })
      .catch(() => alert("Something went wrong"))
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={registerUser} method="POST">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              className="ml-1 p-1 text-sm text-muted-foreground"
              htmlFor="name"
            >
              Name
            </Label>
            <Input
              id="name"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

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
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div className="mb-4 grid gap-1">
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
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button className={cn(buttonVariants())}>Register</button>
        </div>
      </form>
    </div>
  )
}
