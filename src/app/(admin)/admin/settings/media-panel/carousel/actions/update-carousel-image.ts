"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCarouselImage(
  id: string,
  data: {
    title?: string;
    durationSec?: number;
    isActive?: boolean;
  }
) {
  await prisma.carouselImage.update({
    where: { id },
    data: {
      title: data.title,
      durationSec: data.durationSec,
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin/settings/media-panel/carousel/test");
}