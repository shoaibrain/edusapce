/**
 * v0 by Vercel.
 * @see https://v0.dev/t/axEuQLHG5WB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "./ui/button"
import Image from "next/image"

export default function SchoolHeroCarousel() {
  return (
    <Carousel className="relative h-full w-full items-center justify-center bg-red-200 ">
      <div className="absolute inset-2 bg-yellow-500 p-4">
        <CarouselContent className="absolute ">
          <CarouselItem>
          <div className="flex items-center justify-center">
            <div className="grid items-center gap-2 md:grid-cols-2">
              <Image
                src="/placeholder.png"
                alt="Carousel Image"
                width={1000}
                height={1000}
                className="object-cover"
              />
              <div className="space-y-4">  <h3 className="text-3xl font-bold">Explore the Outdoors</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Discover breathtaking landscapes and embark on unforgettable adventures in nature.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid items-center gap-4 md:grid-cols-2">
              <Image
                src="/placeholder.png"
                alt="Carousel Image"
                width={1000}
                height={1000}
                className="lg aspect-video object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Embrace the City Life</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Immerse yourself in the vibrant energy and endless possibilities of urban landscapes.
                </p>
                <Button variant="outline">Explore Now</Button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid items-center gap-4 md:grid-cols-2">
              <Image
                src="/placeholder.png"
                alt="Carousel Image"
                width={880}
                height={630}
                className="lg aspect-video object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Relax and Unwind</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Escape the hustle and bustle and find your oasis of tranquility and relaxation.
                </p>
                <Button variant="outline">Discover More</Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </div>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  )
}
