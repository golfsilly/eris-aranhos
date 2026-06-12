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
    image: "/images/carousel/picture1.jpg",
    title: "Mental Health Check-in",
  },
  {
    image: "/images/carousel/picture2.jpg",
    title: "Health",
  },
];

function EmptyState() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m3 9 5-5" />
        <path d="m21 9-5-5" />
        <path d="m3 15 5 5" />
        <path d="m21 15-5 5" />
      </svg>
      <p className="text-sm">ไม่มีรูปภาพ</p>
    </div>
  );
}

export function CarouselPicture() {
  const validSlides = slides.filter(
    (s) => s.image && s.image !== "/" && s.image.trim() !== "",
  );

  if (validSlides.length === 0) {
    return <EmptyState />;
  }

  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
      opts={{ loop: true }}
      className="w-full h-full" // ✅ เพิ่ม h-full
    >
      <CarouselContent className="h-full">
        {validSlides.map((slide) => (
          <CarouselItem key={slide.image} className="h-full">
            <div className="relative h-[600px] w-full">
              <Image
                src="/images/carousel/picture1.jpg"
                alt="Picture"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
