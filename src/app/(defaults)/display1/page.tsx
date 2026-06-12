import { prisma } from "@/lib/prisma";
import { DisplayClient } from "./_components/display-client";

export default async function DisplayPage() {
  const carouselImages = await prisma.carouselImage.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      durationSec: true,
    },
  });

  return <DisplayClient initialCarouselImages={carouselImages} />;
}
