"use server";

import { prisma } from "@/lib/prisma";

export async function toggleCprStatus(isActive: boolean) {
  const setting = await prisma.mediaSetting.upsert({
    where: { id: "main" },
    create: { id: "main", isCprActive: isActive },
    update: { isCprActive: isActive },
  });

  return setting.isCprActive;
}
