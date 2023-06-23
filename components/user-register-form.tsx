"use client"

import * as React from "react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserRegisterForm() {
  const router = useRouter()
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const registerUser = async (e) => {
    e.preventDefault()
    axios
      .post("/api/register", data)
      .then(() => {
        console.log("User has been registered")
        console.log(data)
        router.push("/login")
      })
      .catch(() => alert("Something went wrong"))
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={registerUser} method="POST">
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
            <Label
              className="ml-1 p-1 text-sm text-muted-foreground"
              htmlFor="firstName"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="firstName"
              autoCapitalize="none"
              autoComplete="firstName"
              autoCorrect="off"
              required
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </div>

          <div className="sm:col-span-3">
            <Label
              className="ml-1 p-1 text-sm text-muted-foreground"
              htmlFor="lastName"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="lastName"
              autoCapitalize="none"
              autoComplete="lastName"
              autoCorrect="off"
              required
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>

          <div className="sm:col-span-3">
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

          <div className="sm:col-span-3">
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
        </div>
        <div className="w-100 mt-6 flex items-center justify-center">
          <Button className={cn(buttonVariants())}>Register</Button>
          </div>

      </form>
    </div>
  )
}
