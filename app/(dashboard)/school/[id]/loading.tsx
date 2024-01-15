// a bunch of loading divs



export default function Loading() {
  return (
    <>
      <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
       <p>school loading</p>
      </div>
    </>
  );
}
