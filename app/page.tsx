import { User } from "@/components/user"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"


export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
         A school management system built with Next.js <br />PlanetScale and shadcn UI
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Easily manage school and educational organizations with this app. <br />Built with Next.js, PlanetScale and shadcn UI
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/login"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Login
        </Link>
        <Link
          href="/register"
          rel="noreferrer"
          className={buttonVariants()}
        >
          register
        </Link>
      </div>
    </section>
  )
}
