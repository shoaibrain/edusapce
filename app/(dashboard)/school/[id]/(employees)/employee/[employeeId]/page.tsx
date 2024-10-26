//@ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { getEmployee } from "@/services/service-employee"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, MessageSquare, Phone, User, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: "Employee",
  description: "Employee Profile Page",
}

export default async function EmployeePage({ params }: {
   params: { id: string, employeeId: string }
}) {
  const schoolId = params.id
  const employeeId = params.employeeId

    if (!employee) {
      return <p>No Employee found</p>
    }

  // Mock data
  const classPeriods = [
    { id: 1, subject: "Mathematics", class: "10A", time: "09:00 AM - 10:00 AM", room: "Room 101" },
    { id: 2, subject: "Physics", class: "11B", time: "11:00 AM - 12:00 PM", room: "Lab 2" },
    { id: 3, subject: "Mathematics", class: "9C", time: "02:00 PM - 03:00 PM", room: "Room 103" },
  ]

  const communications = [
    { id: 1, type: "email", from: "principal@school.edu", subject: "Staff Meeting", date: "2023-09-24" },
    { id: 2, type: "message", from: "John Smith", subject: "Curriculum Update", date: "2023-09-23" },
  ]

  const notifications = [
    { id: 1, message: "New school policy update", date: "2023-09-24" },
    { id: 2, message: "Upcoming parent-teacher conference", date: "2023-09-25" },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employee Details</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 size-4" />
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>
              <Link href={`/school/${schoolId}/employee/${employeeId}/settings`}>
                Profile Settings
              </Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              Option
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              Option
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(employee, null, 2)}</code>
          </pre>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-4">
              <Avatar className="size-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback>{`${employee.firstName[0]}${employee.lastName[0]}`}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{`${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`}</h2>
                <p className="text-muted-foreground">{employee.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Mail className="size-4 text-muted-foreground" />
                <span>{employee.email || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="size-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="size-4 text-muted-foreground" />
                <span>Employee ID: {employee.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span>Birth Date: {employee.birthDate ? new Date(employee.birthDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Additional Information</h3>
              <p>Address: {employee.address}</p>
              <p>Gender: {employee.gender || 'N/A'}</p>
              <p>Department ID: {employee.departmentId || 'N/A'}</p>
              <p>School ID: {employee.schoolId}</p>
              <p>Tenant ID: {employee.tenantId}</p>
              <p>Created At: {new Date(employee.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(employee.updatedAt).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details">Class Schedule</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Current Class Schedule</CardTitle>
              <CardDescription>Ongoing and upcoming classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPeriods.map((period) => (
                  <div key={period.id} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <h3 className="font-semibold">{period.subject}</h3>
                      <p className="text-sm text-muted-foreground">Class: {period.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{period.time}</p>
                      <p className="text-sm text-muted-foreground">{period.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Latest messages and emails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                    {comm.type === 'email' ? (
                      <Mail className="h-6 w-6 text-primary" />
                    ) : (
                      <MessageSquare className="h-6 w-6 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">{comm.subject}</p>
                      <p className="text-sm text-muted-foreground">From: {comm.from}</p>
                      <p className="text-sm text-muted-foreground">Date: {comm.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent alerts and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                    <Bell className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">{notif.message}</p>
                      <p className="text-sm text-muted-foreground">Date: {notif.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
