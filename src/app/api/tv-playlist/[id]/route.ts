import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function PATCH(req: Request, props: { params: Params }) {
  const params = await props.params;
  const body = await req.json();
  const item = await prisma.tvPlaylistItem.update({
    where: { id: params.id },
    data: {
      title: body.title,
      youtubeId: body.youtubeId,
      isActive: body.isActive,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json(item);
}
export async function DELETE(req: Request, props: { params: Params }) {
  const params = await props.params;
  await prisma.tvPlaylistItem.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
