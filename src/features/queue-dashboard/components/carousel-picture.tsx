"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const slides = [
  {
    image: "/slides/1.jpg",
    title: "ประชาสัมพันธ์โรงพยาบาล",
  },
  {
    image: "/slides/2.jpg",
    title: "วันงดสูบบุหรี่โลก",
  },
  {
    image: "/slides/3.jpg",
    title: "บริการห้องฉุกเฉิน",
  },
];

export function CarouselPicture() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.image}>
            <div className="overflow-hidden rounded-xl border bg-card">
              <Image
                src={slide.image}
                alt={slide.title}
                width={800}
                height={600}
                className="aspect-4/5 w-full object-cover"
              />

              <div className="border-t p-4">
                <h3 className="font-semibold">
                  {slide.title}
                </h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}