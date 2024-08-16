

interface YearGradeLevel {
  id: string;
  name: string;
  description: string | null;
  levelCategory: string;
  levelOrder: number;
  capacity: number | null;
  classRoom: string | null;
  studentCount: number | null;
};

export default function YearGradeLevelCard({ data }: { data: YearGradeLevel }) {

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      {/* <Link
        href={`school/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      > */}
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide dark:text-white">
            {data.name}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {`Description: ${data.description}`}
          </p>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {`Category: ${data.levelCategory}`}
          </p>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {`Total Students: ${data.studentCount}`}
          </p>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {`Capacity: ${data.capacity}`}
          </p>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {`Class Room: ${data.classRoom}`}
          </p>
        </div>

        {/*
        Note: good to have analytics for schools
        <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <Link
          href={`school/${data.id}/analytics`}
          className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50"
        >
          <BarChart height={16} />
          <p>{random(10, 40)}%</p>
        </Link>
      </div> */
      }
      {/* </Link> */}
    </div>
  );
}
