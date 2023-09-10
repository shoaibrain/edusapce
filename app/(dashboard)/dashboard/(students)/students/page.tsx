
import React from 'react'
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Gauge, Users, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'

async function getStudents() {
  const URL = 'https://project-eduspace.vercel.app/';
  try {
    const res = await fetch(`${URL}/api/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch student data')
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

// Simulate a database read for tasks.
async function getTasks() {
  return [
    {
      "id": "TASK-8782",
      "title": "You can't compxel!",
      "status": "in progress",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7878",
      "title": "Try to calculate the EXixel!",
      "status": "backlog",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7839",
      "title": "We need to bypass the neural TCP card!",
      "status": "todo",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-5562",
      "title": "The SAShe PNG bandwidth!",
      "status": "backlog",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-8686",
      "title": "Inel!",
      "status": "canceled",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-1280",
      "title": "Use the digital ptic system!",
      "status": "done",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-7262",
      "title": "The UTF8 appli PNG firewall!",
      "status": "done",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-1138",
      "title": "GenP bandwidth!",
      "status": "in progress",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-7184",
      "title": "We need to program the back-end THX pixel!",
      "status": "todo",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-5160",
      "title": "Calculating trotocol!",
      "status": "in progress",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-5618",
      "title": "Genlication!",
      "status": "done",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-6699",
      "title": "I'll feed!",
      "status": "backlog",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-2858",
      "title": "We need to override the online UDP bus!",
      "status": "backlog",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-9864",
      "title": "I'll reboot thedrive!",
      "status": "done",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-8404",
      "title": "We need talarm!",
      "status": "in progress",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-5365",
      "title": "Backing y IB array!",
      "status": "in progress",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-1780",
      "title": "The CSS the CLI protocol!",
      "status": "todo",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-6938",
      "title": "Use the redundant alarm!",
      "status": "todo",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-9885",
      "title": "We need to compress the auxiliary VGA driver!",
      "status": "backlog",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-3216",
      "title": "Transmitting rtual HDD sensor!",
      "status": "backlog",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-9285",
      "title": "The IP monitor  transmitter!",
      "status": "todo",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-1024",
      "title": "Overriding the  OCR transmitter!",
      "status": "in progress",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-7068",
      "title": "You can't ss HEX pixel!",
      "status": "canceled",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-6502",
      "title": "Navigating SQL bus!",
      "status": "todo",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-5326",
      "title": "We need to hack the redundant UTF8 transmitter!",
      "status": "todo",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-6274",
      "title": "Use the virtual PCI circuit, larm!",
      "status": "canceled",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-1571",
      "title": "I'll input the neural DRface!",
      "status": "in progress",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-9518",
      "title": "Compressing thSDD matrix!",
      "status": "canceled",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-5581",
      "title": "I'll synthesiztocol!",
      "status": "backlog",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-2197",
      "title": "Parsing th bus!",
      "status": "todo",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-8484",
      "title": "We needewall!",
      "status": "in progress",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-9892",
      "title": "If we back multi-byte THX capacitor!",
      "status": "done",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-9616",
      "title": "We need to pixel!",
      "status": "in progress",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-9744",
      "title": "Use the brive!",
      "status": "done",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-1376",
      "title": "Generating capacitor!",
      "status": "backlog",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-7382",
      "title": "If UTF8 pixel!",
      "status": "todo",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-2290",
      "title": "I'll compress e UTF8 bus!",
      "status": "canceled",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-1533",
      "title": "You can't input the firewall wiewall!",
      "status": "done",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-4920",
      "title": " JSON program!",
      "status": "in progress",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-5168",
      "title": "If wearray!",
      "status": "in progress",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-7103",
      "title": "We needbandwidth!",
      "status": "canceled",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-4314",
      "title": "I COM matrix!",
      "status": "in progress",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-3415",
      "title": "Use feed!",
      "status": "todo",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-8339",
      "title": "Try toor!",
      "status": "in progress",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-6995",
      "title": "Try tomatrix!",
      "status": "todo",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-8053",
      "title": "If UDP protocol!",
      "status": "todo",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-4336",
      "title": "Iptical UDPram!",
      "status": "todo",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-8790",
      "title": "I'capacitor!",
      "status": "done",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-8980",
      "title": "firewall!",
      "status": "canceled",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-7342",
      "title": "Use port!",
      "status": "backlog",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-5608",
      "title": "P transmitter!",
      "status": "canceled",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-1606",
      "title": "I'll driver!",
      "status": "done",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-7872",
      "title": " monitor!",
      "status": "canceled",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-4167",
      "title": "Use ze the optical feed!",
      "status": "canceled",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-9581",
      "title": "YouXSS monitor!",
      "status": "backlog",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-8806",
      "title": "We  panel!",
      "status": "done",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-6542",
      "title": "Trystem!",
      "status": "done",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-6806",
      "title": "Th panel!",
      "status": "canceled",
      "label": "documentation",
      "priority": "low"
    },
    {
      "id": "TASK-9549",
      "title": "Youbus!",
      "status": "todo",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-1075",
      "title": "Bpixel!",
      "status": "done",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-1427",
      "title": "Use rface!",
      "status": "done",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-1907",
      "title": "Hacking stem!",
      "status": "todo",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-4309",
      "title": "al GB pixel!",
      "status": "backlog",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-3360",
      "title": "Yorface!",
      "status": "done",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-9887",
      "title": "Urt!",
      "status": "backlog",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-3649",
      "title": " DNS monitor!",
      "status": "in progress",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-3586",
      "title": "ile SMS hard drive!",
      "status": "in progress",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-5150",
      "title": "Iinterface!",
      "status": "canceled",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-3652",
      "title": "T interface!",
      "status": "backlog",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-6884",
      "title": "Use microchip!",
      "status": "canceled",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-1591",
      "title": "Wever!",
      "status": "in progress",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-3802",
      "title": "Tryirtual matrix!",
      "status": "in progress",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-7253",
      "title": "Phard drive!",
      "status": "backlog",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-9739",
      "title": "We need to hack the multi-byte HDD bus!",
      "status": "done",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-4424",
      "title": "Tral pixel!",
      "status": "in progress",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-3922",
      "title": "You canprogram!",
      "status": "backlog",
      "label": "bug",
      "priority": "low"
    },
    {
      "id": "TASK-3970",
      "title": "You ca card!",
      "status": "todo",
      "label": "documentation",
      "priority": "medium"
    },
    
  ]
}

export default async function StudentsPage() {
  // const students = await getStudents();

  const tasks = await getTasks()
  if (!tasks) {
    notFound()
  }

  const admissionRate = tasks.length;

  return (
    <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Admissions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {`${admissionRate} new admissions`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendence Rate
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Academic Performance
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +06% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Alerts
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                 +9 new Alerts  
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <div>
            <Link href="dashboard/admission" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Add Student
            </Link>
            </div>
            <div>
            <Link href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Pay School Fees
            </Link>
            </div>
            <div>
            <Link  href="dashboard/students/bills" className={cn(buttonVariants({ size: "lg", variant:"default" }))}>
              Generate Transcript
            </Link>
            </div>
          </div>
          <div className="container mx-auto  py-10">
            <DataTable columns={columns} data={tasks} />
          </div>
    </>
  )
}
