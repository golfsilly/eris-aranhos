import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.youtubePlaylistItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();

  const last = await prisma.youtubePlaylistItem.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  const item = await prisma.youtubePlaylistItem.create({
    data: {
      title: body.title,
      youtubeId: body.youtubeId,
      isActive: true,
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(item);
}