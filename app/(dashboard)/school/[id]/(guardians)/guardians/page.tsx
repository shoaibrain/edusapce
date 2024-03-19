
//@ts-nocheck

import React from 'react'
import { notFound } from "next/navigation"
import {  columns } from '@/components/data-tables/columns-guardian-data-table'
import { Metadata } from 'next'
import { DataTable } from '@/components/data-tables/data-table'
import { getGuardiansForSchool } from '@/services/service-guardian'
import { Guardian } from '@prisma/client'

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
        <div className='container mx-auto py-10'>
          <DataTable columns={columns} data={guardians} guardian={true}/>
        </div>
    </>
  )
}
