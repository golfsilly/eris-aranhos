"use server";

import { prisma } from "@/lib/prisma";

export async function getYoutubeSetting() {
  return prisma.youtubeSetting.upsert({
    where: {
      id: "main",
    },
    update: {},
    create: {
      id: "main",
      muted: false,
      volume: 0.5,
    },
  });
}

export async function updateYoutubeSetting(data: {
  muted: boolean;
  volume: number;
}) {
  return prisma.youtubeSetting.upsert({
    where: {
      id: "main",
    },
    update: {
      muted: data.muted,
      volume: data.volume,
    },
    create: {
      id: "main",
      muted: data.muted,
      volume: data.volume,
    },
  });
}