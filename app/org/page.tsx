import SideBar from "@/components/forms/side-bar";
import { useStepper } from "@/hooks/use-stepper-wizard";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TenantOrgForm } from "@/components/forms/tenant-org-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SchoolGeneralForm } from "@/components/school-general-settings";

export const metadata: Metadata = {
  title: "School Settings",
  description: "School and Academic Settings",
};

interface SchoolSettingsPageProps {
  params: { schoolId: string };
}


export default async function SchoolSettingsPage({ params }: SchoolSettingsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h3 className="mb-4 text-lg font-medium">School Settings</h3>
        <Tabs defaultValue="school profile" className="space-y-4">
          <TabsList className="p-5">
            <TabsTrigger value="school profile" >General Settings</TabsTrigger>
            <TabsTrigger value="school academic" >Academic Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="school profile" className="space-y-4">
            <SchoolGeneralForm />
          </TabsContent>

          <TabsContent value="school academic" className="space-y-4">
            {/* <SchoolGeneralForm /> */}
            <p>School Academic Settings</p>
          </TabsContent>



        </Tabs>
      </div>
    </div>
  );
}
