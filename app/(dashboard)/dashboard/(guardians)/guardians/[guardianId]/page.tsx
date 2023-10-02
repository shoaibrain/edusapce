import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileOptions } from "@/components/profile-options";
import { Guardian } from "@prisma/client";

export const metadata: Metadata = {
  title: "Guardian Details",
  description: "Guardian Dashboard",
}
interface GuardianPageProps {
  params: { guardianId: string };
}

const URL = process.env.API_URL

async function getGuardian(guardianId: Guardian["id"]) {
  console.log(URL)
  try {
    const res =  await fetch(`${URL}/guardians/${guardianId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 },
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

export default async function GuardianPage({ params }: GuardianPageProps) {

  const guardian = await getGuardian(params.guardianId);

  if (!guardian) {
    notFound();
  }
  return (
    <div>
          <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-sm font-medium">
                  {`${guardian.firstName} ${guardian.lastName}`}
                </h2>
                <div className="flex items-center space-x-2">
                   <ProfileOptions guardian={guardian}/>
                </div>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="p-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students" disabled>Students</TabsTrigger>
                <TabsTrigger value="accounts" disabled>Accounts</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                  <div>
                    <dt className="text-sm font-medium">First Name</dt>
                    <dd className="text-sm font-medium">{guardian.firstName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Last Name</dt>
                    <dd className="text-sm font-medium">{guardian.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Phone No.</dt>
                    <dd className="text-sm font-medium">{guardian.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Home Address</dt>
                    <dd className="text-sm font-medium">{guardian.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Email</dt>
                    <dd className="text-sm font-medium">{guardian.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Profession</dt>
                    <dd className="text-sm font-medium">{guardian.profession}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Annual Income</dt>
                    <dd className="text-sm font-medium">{guardian.annualIncome}</dd>
                  </div>
                </div>

              </TabsContent>
              <TabsContent value="students">Student details</TabsContent>
              <TabsContent value="accounts">Account Details</TabsContent>
            </Tabs>
          </div>

    </div>
  );

}
