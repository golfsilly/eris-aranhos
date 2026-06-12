import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";

export async function GET() {
  const images = await prisma.carouselImage.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      durationSec: true,
    },
  });

  return Response.json(images);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const title = form.get("title") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_KEY ||
      !process.env.CLOUDINARY_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary not configured on server" },
        { status: 500 },
      );
    }

    const buffer = await file.arrayBuffer();
    const b64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${b64}`;

    // upload to Cloudinary
    const uploadResult: any = await cloudinary.uploader.upload(dataUri, {
      folder: "eris_carousel",
      resource_type: "image",
      overwrite: false,
    });

    // determine next sort order
    const max = await prisma.carouselImage.aggregate({
      _max: { sortOrder: true },
    });
    const nextOrder = (max._max.sortOrder ?? 0) + 1;

    const created = await prisma.carouselImage.create({
      data: {
        title: title ?? (file as any).name,
        fileName: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
        sortOrder: nextOrder,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("Carousel upload error:", err);
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const item = await prisma.carouselImage.findUnique({ where: { id } });

    if (!item)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // remove from Cloudinary if fileName exists
    if (item.fileName) {
      await cloudinary.uploader.destroy(item.fileName, {
        resource_type: "image",
      });
    }

    await prisma.carouselImage.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? String(err) },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();

  if (body.action === "reorder" && Array.isArray(body.ids)) {
    const { ids } = body;

    await Promise.all(
      ids.map((id: string, idx: number) =>
        prisma.carouselImage.update({
          where: { id },
          data: { sortOrder: idx },
        }),
      ),
    );

    return NextResponse.json({ ok: true });
  }

  if (body.action === "update" && body.id) {
    const data: any = {};
    if (typeof body.title === "string") data.title = body.title;
    if (typeof body.durationSec === "number")
      data.durationSec = body.durationSec;
    if (typeof body.isActive === "boolean") data.isActive = body.isActive;

    const updated = await prisma.carouselImage.update({
      where: { id: body.id },
      data,
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
