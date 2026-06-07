"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── ดึงข้อมูลวิดีโอทั้งหมด (เรียงตาม sortOrder) ─────────────────────────
export async function getPlaylistItems() {
  return await prisma.youtubePlaylistItem.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
}

// ─── ลบวิดีโอ ───────────────────────────────────────────────────
export async function deletePlaylistItem(id: string) {
  await prisma.youtubePlaylistItem.delete({ where: { id } });
  revalidatePath("/monitor");
}

// ─── เปิด/ปิด การใช้งานวิดีโอ ────────────────────────────────────────
export async function togglePlaylistItem(id: string, isActive: boolean) {
  const item = await prisma.youtubePlaylistItem.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/monitor");
  return item;
}

// ─── อัปเดตลำดับจากการลากวาง (Bulk Update แบบ Transaction) ───────────
export async function updatePlaylistOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.youtubePlaylistItem.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );
  revalidatePath("/monitor");
}

// ─── สร้างวิดีโอใหม่ ───────────────────────────────
export async function createPlaylistItem(data: {
  title: string;
  youtubeId: string;
}) {
  // หาค่า sortOrder ที่มากที่สุดในปัจจุบัน เพื่อเอามาบวกหนึ่ง
  const maxOrder = await prisma.youtubePlaylistItem.aggregate({
    _max: { sortOrder: true },
  });

  const nextOrder = (maxOrder._max.sortOrder ?? -1) + 1;

  const item = await prisma.youtubePlaylistItem.create({
    data: {
      title: data.title,
      youtubeId: data.youtubeId,
      sortOrder: nextOrder,
      isActive: true,
    },
  });

  revalidatePath("/monitor");
  return item;
}
