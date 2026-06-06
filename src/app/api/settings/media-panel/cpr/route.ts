import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const setting = await prisma.mediaSetting.findUnique({
      where: { id: "main" },
    });

    return NextResponse.json({
      isCprActive: setting?.isCprActive ?? false,
    });
  } catch (error: unknown) {
    console.error("Database Error (CPR Status GET):", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการโหลดสถานะ CPR" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { isCprActive } = await request.json();

    const setting = await prisma.mediaSetting.upsert({
      where: { id: "main" },
      create: { id: "main", isCprActive },
      update: { isCprActive },
    });

    return NextResponse.json({ success: true, isCprActive: setting.isCprActive });
  } catch (error: unknown) {
    console.error("Database Error (CPR Status):", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกสถานะ CPR" },
      { status: 500 },
    );
  }
}
