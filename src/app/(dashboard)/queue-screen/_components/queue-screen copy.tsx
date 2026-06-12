"use client";

import { useState, useEffect } from "react";
import mockData from "@/test/data.json"; // ดึงข้อมูลจากไฟล์ data.json โดยตรง

const TRIAGE_LEVELS = [
  {
    level: 1,
    name: "Resuscitate (กู้ชีพทันที)",
    style: "bg-red-800 text-white",
  },
  {
    level: 2,
    name: "Emergency (ฉุกเฉินเร่งด่วน)",
    style: "bg-pink-600 text-white",
  },
  { level: 3, name: "Urgency (ด่วนมาก)", style: "bg-orange-500 text-white" },
  { level: 4, name: "Semi Urgency (ด่วน)", style: "bg-green-500 text-black" },
  {
    level: 5,
    name: "Non Urgency (รอได้)",
    style: "bg-white text-black border border-gray-300",
  },
];

export default function QueueScreen() {
  const [queues, setQueues] = useState<any[]>([]);
  const [callingQueue, setCallingQueue] = useState<any>(null);
  const [isCprActive, setIsCprActive] = useState(false);
  const [channel, setChannel] = useState("ช่องตรวจ 1");

  useEffect(() => {
    fetchData();
    // ใช้ Polling ตรวจสอบสถานะการเปลี่ยนแปลงทุก 2 วินาที
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    try {
      // ดึงสถานะปัจจุบันจาก localStorage (เพื่อใช้แชร์ข้อมูลจำลองข้ามหน้าจอไปยังหน้า TV)
      const storedCalling = localStorage.getItem("currentlyCalling");
      const storedCpr = localStorage.getItem("isCprActive");

      setCallingQueue(storedCalling ? JSON.parse(storedCalling) : null);
      setIsCprActive(storedCpr === "true");

      // แปลงข้อมูลจาก data.json
      const mappedData = mockData.map((item: any) => ({
        id: item.vn,
        no: item.oqueue,
        level: item.er_emergency_level_id || 5,
        name: item.fname,
        status: item.tost_name || "รอตรวจ",
      }));

      // 🔥 เรียงลำดับตามความเร่งด่วน (er_emergency_level_id: 1 ไปหา 5)
      const sortedData = mappedData.sort((a, b) => a.level - b.level);
      setQueues(sortedData);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // 🚨 เปิด/ปิดระบบ CPR Alert
  const toggleCpr = () => {
    const nextState = !isCprActive;
    setIsCprActive(nextState);
    localStorage.setItem("isCprActive", String(nextState));
  };

  // 🔊 กดเรียกคิว (รองรับการเรียกคิวเดิมซ้ำๆ, ข้ามคิวไปมาได้อิสระ)
  const handleCallQueue = (targetQueue: any) => {
    const callPayload = {
      ...targetQueue,
      channel: channel,
      calledAt: Date.now(), // ใส่ Timestamp เพื่อให้หน้าจอ TV รู้ว่าเป็นคำสั่งเรียกใหม่ แม้จะเป็นคิวเดิม
    };
    setCallingQueue(callPayload);
    localStorage.setItem("currentlyCalling", JSON.stringify(callPayload));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🏥 ระบบจัดการคิวห้องฉุกเฉิน (Queue Screen)
        </h1>
        <div className="flex items-center gap-3">
          <label className="font-semibold">ประจำจุด:</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="border p-2 rounded-lg bg-gray-50 font-medium cursor-pointer"
          >
            <option value="ช่องตรวจ 1">ช่องตรวจ 1</option>
            <option value="ช่องตรวจ 2">ช่องตรวจ 2</option>
            <option value="ห้องหัตถการ">ห้องหัตถการ</option>
            <option value="เตียงฉุกเฉิน 1">เตียงฉุกเฉิน 1</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* คอลัมน์ขวา: คิวปัจจุบันและรายการรอเรียก (เรียงตาม Triage) */}
        <div className="lg:col-span-2 space-y-6">
          {/* สถานะคิวล่าสุดที่ถูกพยาบาลกดเรียก */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-blue-800 text-lg font-bold mb-2">
              📢 คิวที่เรียกบนหน้าจอทีวีล่าสุด
            </h2>
            {callingQueue ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-5xl font-black text-blue-900">
                    คิว {callingQueue.no}
                  </span>
                  <span className="ml-4 px-3 py-1 rounded bg-blue-200 text-blue-800 text-sm font-bold">
                    {callingQueue.channel}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    ผู้ป่วย: {callingQueue.name}
                  </p>
                </div>
                <div className="text-blue-600 font-bold bg-blue-100 px-4 py-2 rounded-xl animate-pulse">
                  🔊 ส่งสัญญาณเรียกแล้ว
                </div>
              </div>
            ) : (
              <div className="text-blue-500 italic">
                ยังไม่มีการเรียกคิวในขณะนี้
              </div>
            )}
          </div>

          {/* รายการผู้ป่วยคัดกรอง รอเรียกตรวจ */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              📋 รายการผู้ป่วยรอตรวจ (เรียงตามระดับความรุนแรง)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 text-sm font-semibold uppercase">
                    <th className="py-3 px-4">ชื่อผู้ป่วย</th>
                    <th className="py-3 px-4">หมายเลขคิว</th>
                    <th className="py-3 px-4">ระดับความเร่งด่วน</th>
                    <th className="py-3 px-4 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {queues.map((q) => {
                    const triage = TRIAGE_LEVELS.find(
                      (t) => t.level === q.level,
                    );
                    const isCurrentCalling = callingQueue?.id === q.id;
                    return (
                      <tr
                        key={q.id}
                        className={`hover:bg-gray-50 transition-colors ${isCurrentCalling ? "bg-blue-50/50" : ""}`}
                      >
                        <td className="py-4 px-4 font-bold text-gray-700">
                          {q.name}
                        </td>
                        <td className="py-4 px-4 text-2xl font-black text-gray-900">
                          {q.no}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${triage?.style}`}
                          >
                            {triage?.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleCallQueue(q)}
                            className={`${
                              isCurrentCalling
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors`}
                          >
                            {isCurrentCalling
                              ? "🔄 เรียกซ้ำอีกครั้ง"
                              : "🔔 เรียกคิวขึ้น TV"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
