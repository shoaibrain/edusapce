import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-wrap items-center justify-center gap-2 py-5 md:gap-4 lg:gap-6">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/4">
          {/* <Icons.logo /> */}
          <p className="text-center text-sm leading-loose">
            &copy; 2024 Saraswai English Boarding School
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/4">
          {/* <ThemeToggle /> */}
          Div Two
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/4">
          {/* Another inner div */}
          Div Three
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/4">
          {/* Another inner div */}
          Div Four
        </div>
      </div>
    </footer>
  );
}
