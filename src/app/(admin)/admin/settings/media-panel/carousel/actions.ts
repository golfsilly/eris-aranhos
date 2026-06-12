"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function toggleCarouselStatus(enabled: boolean) {
  const updated = await prisma.mediaSetting.upsert({
    where: {
      id: "main",
    },
    create: {
      id: "main",
      mode: enabled ? "CAROUSEL" : "YOUTUBE",
    },
    update: {
      mode: enabled ? "CAROUSEL" : "YOUTUBE",
    },
  });

  revalidatePath("/admin/settings/media-panel/carousel");

  return updated.mode === "CAROUSEL";
}
