
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Metadata } from "next";
import { SchoolSettingsForm } from "@/components/school-general-settings";
import {SchoolAcademicSettingsForm} from "@/components/school-academic-settings";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";

// TODO get a current logged in user, get school id for this user, get school for this user
export const metadata: Metadata = {
  title: "School Settings",
  description: "School and Academic Settings",
};

const URL = "http://localhost:3000/api/v1/";

interface SchoolSettingsPageProps {
  params: { schoolId: string };
}

async function getSchool( schoolId: string) {
  try {
    const res = await fetch(`${URL}/schools/${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch school data')
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching school:', error);
    throw error;
  }
}

// get current logged in user schoolId


export default async function SchoolSettingsPage({ params }: SchoolSettingsPageProps) {
  // const user = await getCurrentUser()


  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }


// get school id for this user
// get school for this user
  // const school = await getSchool(params.schoolId);

  // if (!school) {
  //   notFound();
  // }

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
            <SchoolSettingsForm />
          </TabsContent>
          <TabsContent value="school academic" className="space-y-4">
            <SchoolAcademicSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
