import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface StudentsProps {
    children?: React.ReactNode
  }
  
  export default function AdmissionLayout({ children }: StudentsProps) {
    return (
      <div className="container mx-auto grid items-start gap-8 py-2">
        {children}
      </div>
    )
  }