
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function UserStats() {
  // 🟢 ดึงข้อมูลแบบ Group By ยิงไปที่ดาทาเบสแค่ 1 Query ถ้วน
  const counts = await prisma.user.groupBy({
    by: ['role'],
    _count: {
      _all: true,
    },
  });

  // แปลงข้อมูลให้อยู่ในรูปแบบที่เอาไปใช้ง่ายๆ
  const roleCounts = counts.reduce((acc, curr) => {
    if (curr.role) {
      acc[curr.role] = curr._count._all;
    }
    return acc;
  }, {} as Record<UserRole, number>);

  // คำนวณยอดรวมทั้งหมด
  const totalUsers = Object.values(roleCounts).reduce((sum, count) => sum + count, 0);

  // กำหนดค่าเริ่มต้นเป็น 0 ในกรณีที่ Role นั้นยังไม่มีผู้ใช้งานเลย
  const adminUsers = roleCounts[UserRole.ADMIN] ?? 0;
  const doctorUsers = roleCounts[UserRole.DOCTOR] ?? 0;
  const nurseUsers = roleCounts[UserRole.NURSE] ?? 0;
  const staffUsers = roleCounts[UserRole.STAFF] ?? 0;

  return (
    <div className="grid grid-cols-5 gap-4 p-4 bg-slate-50 rounded-lg border">
      <div>Total: <span className="font-bold">{totalUsers}</span></div>
      <div>Admin: <span className="font-bold">{adminUsers}</span></div>
      <div>Doctor: <span className="font-bold">{doctorUsers}</span></div>
      <div>Nurse: <span className="font-bold">{nurseUsers}</span></div>
      <div>Staff: <span className="font-bold">{staffUsers}</span></div>
    </div>
  );
}