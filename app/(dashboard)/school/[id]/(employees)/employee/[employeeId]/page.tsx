//@ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, MessageSquare, Phone, User, Bell, MapPin, Briefcase } from 'lucide-react'
import { employeeGet } from "@/lib/actions/employee-action"

export const metadata: Metadata = {
  title: "Employee",
  description: "Employee Profile Page",
}

export default async function EmployeePage({ params }: {
   params: { id: string, employeeId: string }
}) {
  const schoolId = params.id
  const employeeId = params.employeeId
  const employeedata = await employeeGet(employeeId)

  if (!employeedata) {
    return <p>No Employee found</p>
  }
  const employee = employeedata.data;
  // Mock data (as provided)
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
    <div className="min-h-screen">
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee?.firstName} ${employee?.lastName}`} />
              <AvatarFallback className="text-2xl">{employee?.firstName[0]}{employee?.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">{employee?.firstName} {employee?.lastName}</h1>
              <p className="text-muted-foreground">{employee?.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Change Department</DropdownMenuItem>
              <DropdownMenuItem>Manage Schedule</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted h-12 w-full justify-start gap-6 px-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">Overview</TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-background">Schedule</TabsTrigger>
            <TabsTrigger value="communications" className="data-[state=active]:bg-background">Communications</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 rounded-lg border p-6">
                <h2 className="font-semibold text-lg">Contact Information</h2>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{employee?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{employee?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{employee?.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-lg border p-6">
                <h2 className="font-semibold text-lg">Personal Information</h2>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Birth Date: {new Date(employee?.birthDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>Gender: {employee?.gender}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <span>Department: {employee.department || 'Not Assigned'}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold text-lg mb-6">Class Schedule</h2>
                <div className="space-y-6">
                  {classPeriods.map((period) => (
                    <div key={period.id} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{period.subject}</p>
                        <p className="text-sm text-muted-foreground">Class {period.class} • {period.room}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{period.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communications">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold text-lg mb-6">Recent Communications</h2>
                <div className="space-y-6">
                  {communications.map((comm) => (
                    <div key={comm.id} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{comm.subject}</p>
                        <p className="text-sm text-muted-foreground">From: {comm.from}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {comm.type === 'email' ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                        <span className="text-sm">{comm.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="font-semibold text-lg mb-6">Notifications</h2>
                <div className="space-y-6">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{notif.message}</p>
                        <p className="text-sm text-muted-foreground">{notif.date}</p>
                      </div>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
  )
}

