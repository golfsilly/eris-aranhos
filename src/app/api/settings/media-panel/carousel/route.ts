import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const setting = await prisma.mediaSetting.findUnique({
      where: { id: "main" },
    });

    return NextResponse.json({
      isCarouselActive: setting?.mode === "CAROUSEL",
    });
  } catch (error: unknown) {
    console.error("Database Error (Carousel Status GET):", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการโหลดสถานะ Carousel" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { isCarouselActive } = await request.json();

    const setting = await prisma.mediaSetting.upsert({
      where: { id: "main" },
      create: { id: "main", mode: isCarouselActive ? "CAROUSEL" : "YOUTUBE" },
      update: { mode: isCarouselActive ? "CAROUSEL" : "YOUTUBE" },
    });

    return NextResponse.json({ 
      success: true, 
      isCarouselActive: setting.mode === "CAROUSEL" 
    });
  } catch (error: unknown) {
    console.error("Database Error (Carousel Status):", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกสถานะ Carousel" },
      { status: 500 },
    );
  }
}
