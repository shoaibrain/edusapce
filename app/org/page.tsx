import SideBar from "@/components/forms/side-bar";
import { useStepper } from "@/hooks/use-stepper-wizard";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TenantOrgForm } from "@/components/forms/tenant-org-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Settings",
  description: "School and Academic Settings",
};

interface SchoolSettingsPageProps {
  params: { schoolId: string };
}

const URL = process.env.API_URL;

export default async function SchoolSettingsPage({ params }: SchoolSettingsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h3 className="mb-4 text-lg font-medium">School Settings</h3>
        <Tabs defaultValue="school profile" className="space-y-4">
          <TabsList className="p-5">
            <TabsTrigger value="school profile">General Settings</TabsTrigger>
            <TabsTrigger value="academic settings">Academic Settings</TabsTrigger>
            <TabsTrigger value="class management">Class Management</TabsTrigger>
            <TabsTrigger value="security and access">Security & Access</TabsTrigger>
          </TabsList>
          <TabsContent value="school profile" className="space-y-4">
            <p className="text-sm text-muted-foreground">School Information</p>
            <p className="text-sm text-muted-foreground">Contact Details</p>
            <p className="text-sm text-muted-foreground">Logo & Branding</p>
            <p className="text-sm text-muted-foreground">Timezone Configuration</p>
          </TabsContent>
          <TabsContent value="academic settings" className="space-y-4">
            <p className="text-sm text-muted-foreground">Academic Year Setup</p>
            <p className="text-sm text-muted-foreground">Term/Semester Configuration</p>
            <p className="text-sm text-muted-foreground">Grading System</p>
            <p className="text-sm text-muted-foreground">Curriculum Management</p>
          </TabsContent>
          <TabsContent value="class management" className="space-y-4">
            <p className="text-sm text-muted-foreground">Create/Edit Classes</p>
            <p className="text-sm text-muted-foreground">Assign Teachers</p>
            <p className="text-sm text-muted-foreground">Grading Criteria</p>
            <p className="text-sm text-muted-foreground">Grade Scales</p>
          </TabsContent>
          <TabsContent value="security and access" className="space-y-4">
            <p className="text-sm text-muted-foreground">User Roles & Permissions</p>
            <p className="text-sm text-muted-foreground">Access Control</p>
            <p className="text-sm text-muted-foreground">Password Policies</p>
            <p className="text-sm text-muted-foreground">Data Privacy & Compliance</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
