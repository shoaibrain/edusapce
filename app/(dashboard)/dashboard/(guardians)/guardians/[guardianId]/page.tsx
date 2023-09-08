import { notFound, redirect } from "next/navigation";
import { Guardian, User } from "@prisma/client";
import prisma from "@/lib/db";
import Image from 'next/image'
 
async function getGuardian(guardianId: Guardian["id"]) {
  try {
    const res =  await fetch(`http://localhost:3000/api/guardians/${guardianId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch guardian data')
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching guardians:', error);
    throw error;
 }
}


interface GuardianPageProps {
  params: { guardianId: string };
}

export default async function GuardianPage({ params }: GuardianPageProps) {
  const guardian = await getGuardian(params.guardianId);
  console.log(guardian)
  if (!guardian) {
    notFound();
  }
  const { firstName, lastName, email, phone, address } = guardian;
  
  return (
    <div>
      <div className="grid grid-cols-2 justify-between gap-4 p-2 px-5 sm:px-0 ">
        <div className="p-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900"> {`${firstName} ${lastName}`}</h2>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
           {/* Guardian Info */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="h-40 w-40 shrink-0 items-start">
                <Image
                  className="h-40 w-40"
                  src="/public/user.jpeg"
                  alt="Guardian Image"
                  width={80}
                  height={80}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">First Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{firstName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Last Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{lastName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">email</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">phone</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{phone}</dd>
                </div>
              </div>

          </div>
        </dl>
      </div>
    </div>
  );
  
}
