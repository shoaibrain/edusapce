
//@ts-nocheck

import React from 'react'
import { notFound } from "next/navigation"
import {  columns } from '@/components/data-tables/columns-guardian-data-table'
import { Metadata } from 'next'
import { DataTable } from '@/components/data-tables/data-table'
import { getGuardiansForSchool } from '@/services/service-guardian'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Guardians",
  description: "Guardians Dashboard",
}


export default async function GuardiansPage({
  params,
}: {
  params: { id: string };
}) {

   const guardians = await getGuardiansForSchool(decodeURIComponent(params.id));

    if (!guardians) {
      console.log(`No guardians found`)
      notFound()
    }

  return (
    <>
        <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href= {`/school/${params.id}`}>School</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Guardians</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
        </Breadcrumb>
        <div className='container mx-auto py-10'>
          <DataTable columns={columns} data={guardians} guardian={true}/>
        </div>
    </>
  )
}
