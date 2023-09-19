import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface EmployeeHireLayoutProps {
  children: React.ReactNode
}

export default async function EmployeeHireLayout({
  children,
}: EmployeeHireLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter className="border-t" />
    </div>
  )
}
