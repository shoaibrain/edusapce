import prisma from "@/lib/db";


export default async function StudentAdmissionPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.school.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
       <h1 className="font-cal text-3xl font-bold dark:text-white">
         Student Admission Page
        </h1>
    </div>
  );
}
