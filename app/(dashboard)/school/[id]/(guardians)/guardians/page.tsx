import React from 'react'
import { notFound } from "next/navigation"
import {  columns } from '@/components/data-tables/columns-guardian-data-table'
import { Metadata } from 'next'
import { DataTable } from '@/components/data-tables/data-table'

export const metadata: Metadata = {
  title: "Guardians",
  description: "Guardians Dashboard",
}
const API_URL = process.env.API_URL;

// get all guardians for schoolId
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
          <DataTable columns={columns} data={guardians} guardian={true}/>
        </div>
    </>
  )
}
