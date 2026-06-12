"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CarouselImage = {
  id: string;
  imageUrl: string;
  title?: string | null;
  durationSec: number;
};

type Props = {
  images: CarouselImage[];
};

export function CarouselPicture({ images }: Props) {
  const [index, setIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const current = images[index];
  const next = images[(index + 1) % images.length];

  // AUTO SLIDE
  React.useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      (current?.durationSec ?? 5) * 1000,
    );

    return () => clearInterval(timer);
  }, [index, images, current?.durationSec]);

  // PRELOAD NEXT IMAGE
  React.useEffect(() => {
    if (next?.imageUrl) {
      const img = new window.Image();
      img.src = next.imageUrl;
    }
  }, [next]);

  if (!current) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* IMAGE */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-in-out",
          loaded ? "opacity-100" : "opacity-0",
        )}
      >
        <Image
          src={current.imageUrl}
          alt={current.title || "carousel"}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover"
          onLoad={() => setLoaded(true)}
          priority
          loading="eager"
        />
      </div>

      {/* OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}
