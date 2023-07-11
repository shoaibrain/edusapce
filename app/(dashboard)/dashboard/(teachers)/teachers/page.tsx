import React from 'react'
import { notFound, redirect } from "next/navigation"

import prisma from "@/lib/db"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'


export default async function TeachersPage() {
  return (
    <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <h1>Teachers Page</h1>
          </div>

    </>
  )
}
