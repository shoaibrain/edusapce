import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import SchoolHeroCarousel from "@/components/school-marketing-hero-carousel"


export default async function IndexPage() {
  return (
    <>
      {/* <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"> */}
        {/* <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Streamline your schools administrative tasks
          </h1>

          <div className="space-x-4 space-y-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Dashboard
            </Link>
          </div>
        </div> */}

<section className="flex h-[90vh] items-center md:pb-6 md:pt-5 lg:py-8 px-4">
      <SchoolHeroCarousel />
</section>
    </>
  )
}
