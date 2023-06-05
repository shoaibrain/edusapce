import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Dashboard page for School management system user
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          This is a dashboard page for school management system user. This page
          is used to display the user informations
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/login"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Login
        </Link>

        <Link
          href="/register"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Register
        </Link>
      </div>
    </section>
  )
}
