import { DisplayClient } from "./_components/display-client";
import { prisma } from "@/lib/prisma";

export default async function MonitorPage() {
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
