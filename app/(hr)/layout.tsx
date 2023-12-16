"use client"

import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface DashboardLayoutProps {
  children?: React.ReactNode
}
import { usePathname } from 'next/navigation'
export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const formTitle = pathname?.endsWith('admission') ? 'Student Admission Application Form' : 'Employee Job Application Form';

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col px-2 md:flex">
          {/* TODO: Add Form Stepper here, after moving to multi-step form  */}
          <p className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">{formTitle}</p>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
