import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AcademicProps {
    children?: React.ReactNode
  }

  export default function AcademicLayout({ children }: AcademicProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }
