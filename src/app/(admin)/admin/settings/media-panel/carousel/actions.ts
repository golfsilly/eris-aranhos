"use server";

import { prisma } from "@/lib/prisma";

export async function toggleCarouselStatus(isActive: boolean) {
  const setting = await prisma.mediaSetting.upsert({
    where: { id: "main" },
    create: { id: "main", mode: isActive ? "CAROUSEL" : "YOUTUBE" },
    update: { mode: isActive ? "CAROUSEL" : "YOUTUBE" },
  });

  return setting.mode === "CAROUSEL";
}
