
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Academics",
  description: "Academics Dashboard",
}
const API_URL = process.env.API_URL;


export default async function StudentsPage() {


  return (
    <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Widget
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  windget content
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Widget
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                Widget content
                </p>
              </CardContent>
            </Card>

          </div>
          <section className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <p>Academics body</p>
          </section>
    </>
  )
}
