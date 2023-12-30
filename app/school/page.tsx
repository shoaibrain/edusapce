
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Metadata } from "next";
import { SchoolSettingsForm } from "@/components/forms/form-school-general-settings";
import {SchoolAcademicSettingsForm} from "@/components/forms/form-school-academic-settings";
import {  redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { getSchoolsForTenant } from "@/services/service-tenant";
import { json } from "stream/consumers";

export const metadata: Metadata = {
  title: "School Settings",
  description: "School and Academic Settings",
};

const API_URL = "http://localhost:3000/api/v1";


export default async function SchoolSettingsPage() {
  const tenant = await getCurrentUser()
  if (!tenant) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const schools = await getSchoolsForTenant(tenant.id);

  console.log(`Schols: ${schools}`)
const sc = schools[0]
  return (
    <div className="space-y-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h3 className="mb-4 text-lg font-medium">School Settings</h3>

        <h4 className="mb-4 text-lg font-medium">

        {JSON.stringify(sc)}
        </h4>
        <Tabs defaultValue="school profile" className="space-y-4">
          <TabsList className="p-5">
            <TabsTrigger value="school profile" >General Settings</TabsTrigger>
            <TabsTrigger value="school academic" >Academic Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="school profile" className="space-y-4">
            <SchoolSettingsForm school={schools[0]}/>
          </TabsContent>
          <TabsContent value="school academic" className="space-y-4">
            <SchoolAcademicSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}