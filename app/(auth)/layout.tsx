import { MainNav } from "@/components/main-nav-old"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
    <header className="container z-40 border-b bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <MainNav items={marketingConfig.mainNav} />
        <nav>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4"
            )}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
    <div className="min-h-screen">{children}</div>

    <SiteFooter className="border-t" />
  </div>
  )
}
