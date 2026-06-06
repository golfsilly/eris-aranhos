import { prisma } from "@/lib/prisma";

export async function getTvPlaylist3() {
  const res = await fetch("/api/tv-playlist");
  if (!res.ok) {
    throw new Error("ไม่สามารถโหลด Playlist ได้");
  }
  return res.json();
}

export async function getTvPlaylist() {
  const res = await fetch("/api/tv-playlist");

  const data = await res.json();

  return data;
}

export async function getTvPlaylist2() {
  return prisma.youtubePlaylistItem.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}
