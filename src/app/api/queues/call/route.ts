import { NextResponse } from 'next/server';
import pool from '@/config/db'; // เรียกใช้งาน pool จาก db.ts ที่เราทำไว้

export async function POST(request: Request) {
  try {
    const { id, location } = await request.json(); // รับ id ของคิว และ ชื่อช่องตรวจ

    // 1. เปลี่ยนสถานะคิวเก่าทั้งหมดที่กำลังเรียก (calling) ให้เป็นตรวจอยู่ (examining) เพื่อเคลียร์หน้าจอทีวี
    await pool.execute(
      "UPDATE er_queues SET status = 'examining' WHERE status = 'calling'"
    );

    // 2. อัปเดตคิวใหม่ที่พยาบาลเพิ่งกดเลือก ให้เปลี่ยนสถานะเป็น 'calling' พร้อมระบุช่องตรวจ
    await pool.execute(
      "UPDATE er_queues SET status = 'calling', called_channel = ? WHERE id = ?",
      [location, id]
    );

    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    console.error("Database Error (Call Queue):", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเรียกคิวผู้ป่วย" }, { status: 500 });
  }
}