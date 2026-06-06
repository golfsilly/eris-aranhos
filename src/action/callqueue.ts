import {
  PrismaClient,
  QueueStatus,
  SystemSettingDataType,
} from "@prisma/client";
const prisma = new PrismaClient();

async function handleCallQueue(vn: string, channelName: string) {
  // 1. ค้นหาข้อมูลผู้ป่วยเพื่อเอาหมายเลขคิว (oqueue)
  const patient = await prisma.erQueue.findUnique({ where: { vn } });
  if (!patient) return;

  // 2. ใช้ $transaction เพื่อทำงานร่วมกันอย่างปลอดภัยและเป็นระบบเดียว
  await prisma.$transaction([
    // อัปเดตสถานะผู้ป่วยเป็นกำลังเรียก (calling) และบันทึกช่องตรวจ
    prisma.erQueue.update({
      where: { vn },
      data: { status: QueueStatus.calling, currentChannel: channelName },
    }),

    // บันทึก Log ประวัติการเรียก
    prisma.callLog.create({
      data: { vn, channelName },
    }),

    // บันทึกสถานะปัจจุบันลงตารางตั้งค่าในรูปแบบ JSON เพื่อให้ทีวีดึงไปออกเสียงและอัปเดตหน้าจอ
    prisma.systemSetting.upsert({
      where: { key: "er_tv_calling_status" },
      create: {
        category: "er_display",
        groupName: "tv_screen",
        key: "er_tv_calling_status",
        dataType: SystemSettingDataType.JSON,
        valueJson: {
          vn: patient.vn,
          no: patient.oqueue.toString(),
          channel: channelName,
          calledAt: Date.now(), // ใส่ Timestamp ป้องกันการดึงเสียงซ้ำพร่ำเพรื่อ
        },
      },
      update: {
        valueJson: {
          vn: patient.vn,
          no: patient.oqueue.toString(),
          channel: channelName,
          calledAt: Date.now(),
        },
      },
    }),
  ]);
}
