export default function LoadingSchoolIndexPage() {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-4 h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
              <div className="mb-2 h-6 rounded-l bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 rounded-l bg-gray-300 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
