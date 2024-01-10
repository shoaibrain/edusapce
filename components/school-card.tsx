
import { placeholderBlurhash, random } from "@/lib/utils";
import { School } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import BlurImage from "./blur-image";

export default function SchoolCard({ data }: { data: School }) {

  const url = `${data.name}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`dashboard/school/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <BlurImage
          alt={data.name ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-44 object-cover"
          // @ts-ignore
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          // @ts-ignore
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide dark:text-white">
            {data.name}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">

            {data.tenantId}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">

        <Link
          href={`dashboard/school/${data.id}/analytics`}
          className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50"
        >
          <BarChart height={16} />
          <p>{random(10, 40)}%</p>
        </Link>
      </div>
    </div>
  );
}
