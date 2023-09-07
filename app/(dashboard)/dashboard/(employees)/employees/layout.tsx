import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TeachersPageProps {
    children?: React.ReactNode
  }
  
  export default function TeacherLayout({ children }: TeachersPageProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }