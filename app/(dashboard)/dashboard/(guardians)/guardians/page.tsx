import React from 'react'
import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  Gauge } from 'lucide-react'
import {  columns } from '@/components/data-tables/columns-guardian-data-table'
import { Metadata } from 'next'
import { DataTable } from '@/components/data-tables/data-table'

export const metadata: Metadata = {
  title: "Guardians",
  description: "Guardians Dashboard",
}
const API_URL = process.env.API_URL;

async function getGuardians() {
    try {
      const res = await fetch(`${API_URL}/guardians`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch guardian data')
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching guardians:', error);
      throw error;
    }
  }

export default async function GuardiansPage() {
   const guardians = await getGuardians();
    if (!guardians) {
      notFound()
    }

  return (
    <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Widget
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                    short Description
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='container mx-auto py-10'>
          <DataTable columns={columns} data={guardians} guardian={true}/>
        </div>
    </>
  )
}
