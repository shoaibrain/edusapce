import React from 'react'
import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  Gauge } from 'lucide-react'
import {  columns } from '@/components/data-tables/columns-guardian-data-table'
import { Metadata } from 'next'
import { DataTable } from '@/components/data-tables/data-table'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: "Guardians",
  description: "Guardians Dashboard",
}
const API_URL = process.env.API_URL;

async function getGuardians(schoolId: string) {
    try {
      const res = await fetch(`${API_URL}/guardians`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!res.ok) {
        console.log(`Error fetching guardians: ${res.status}`)
        throw new Error('Failed to fetch guardian data')
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching guardians:', error);
      throw error;
    }
  }

export default async function GuardiansPage({
  params,
}: {
  params: { id: string };
}) {

  const schoolId = decodeURIComponent(params.id)

   const guardians = await getGuardians(schoolId);
    if (!guardians) {
      console.log(`No guardians found`)
      notFound()
    }

  return (
    <>
          <div className='container mx-auto py-10'>
          {/* <div className="pb-8">
           <Link href="/school/inquery" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Guardian Visit Form
          </Link>
           </div> */}
          <DataTable columns={columns} data={guardians} guardian={true}/>
        </div>
    </>
  )
}
