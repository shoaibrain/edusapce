export default async function SchoolPage({
  params,
}: {
  params: { id: string };
}) {

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal w-60 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            school detail page
          </h1>
        </div>
      </div>
    </>
  );
}
