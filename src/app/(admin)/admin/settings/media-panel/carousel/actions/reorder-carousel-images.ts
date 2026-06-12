"use server";

import { prisma } from "@/lib/prisma";

export async function reorderCarouselImages(
  items: {
    id: string;
    sortOrder: number;
  }[]
) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.carouselImage.update({
        where: {
          id: item.id,
        },
        data: {
          sortOrder: item.sortOrder,
        },
      })
    )
  );

  return {
    success: true,
  };
}