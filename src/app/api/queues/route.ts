import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import pool from "@/config/db";

export async function GET() {
  try {
    // 1. ดึงคิวที่กำลังเรียกตรวจล่าสุดจาก MySQL
    const [callingRows]: any = await prisma.$queryRaw`
      SELECT queue_number AS no, triage_level AS level, called_channel AS location
      FROM eris_aranhos
      WHERE status = 'calling'
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    // 2. ดึงรายการคิวที่กำลังรอตรวจ (เรียงจากกลุ่มวิกฤตสีแดง 1 ไปหาสีขาว 5)
    const [waitingRows]: any = await prisma.$queryRaw`
      SELECT id, queue_number AS no, triage_level AS level
      FROM eris_aranhos
      WHERE status = 'waiting'
      ORDER BY triage_level ASC, created_at ASC
    `;

    // 3. ดึงสถานะ CPR จาก MediaSetting
    const setting = await prisma.mediaSetting.findUnique({
      where: { id: "main" },
    });

    return NextResponse.json({
      currentlyCalling: callingRows[0] || null,
      waitingList: waitingRows,
      isCprActive: setting?.isCprActive ?? false,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" },
      { status: 500 },
    );
  }
}

// ➕ POST: ออกคิวผู้ป่วยใหม่ โดยระบบจะรันหมายเลขคิวอัตโนมัติ (เช่น ER-001)
export async function POST(request: Request) {
  try {
    const { level } = await request.json(); // รับค่า triage_level (1-5)

    // 1. ค้นหาคิวล่าสุดของวันนี้เพื่อนำมารันเลขต่อ (ใช้ pool ยิงคำสั่งโดยตรง)
    const [rows]: any = await pool.execute(
      "SELECT COUNT(*) as count FROM eris_aranhos WHERE DATE(created_at) = CURRENT_DATE()",
    );

    const nextNumber = rows[0].count + 1;
    // เติม zero padding ให้เป็น 3 หลัก เช่น ER-001
    const queueNumber = `ER-${String(nextNumber).padStart(3, "0")}`;

    // 2. บันทึกลงฐานข้อมูล MySQL
    await pool.execute(
      "INSERT INTO eris_aranhos (queue_number, triage_level, status) VALUES (?, ?, 'waiting')",
      [queueNumber, level],
    );

    // ส่งข้อมูลกลับไปให้หน้าพยาบาลรับทราบว่าออกคิวสำเร็จ
    return NextResponse.json({ success: true, queueNumber });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการออกคิวผู้ป่วย" },
      { status: 500 },
    );
  }
}
