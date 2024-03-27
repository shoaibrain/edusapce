import { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import { getSchoolsForTenant } from "@/services/service-tenant"
import { Suspense } from "react"

import SchoolCard from "@/components/school-card"
import Image from 'next/image'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SchoolRegisterForm } from "@/components/forms/form-school-register"


export const metadata: Metadata = {
  title: "School Register",
  description: "Register a new school",
}

export default async function DashboardPage() {
  const tenant = await getCurrentUser()
  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  return (
    <>
    <SchoolRegisterForm tenantId={tenant.id}/>
    </>
  )
}
