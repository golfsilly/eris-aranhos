"use client";

import { useState, useEffect, useRef } from "react";
import mockData from "@/test/data.json";

const TRIAGE_LEVELS = {
  1: { label: "Resuscitate (กู้ชีพทันที)", style: "bg-red-800 text-white" },
  2: { label: "Emergency (ฉุกเฉินเร่งด่วน)", style: "bg-pink-600 text-white" },
  3: { label: "Urgency (ด่วนมาก)", style: "bg-orange-500 text-white" },
  4: { label: "Semi Urgency (ด่วน)", style: "bg-green-500 text-black" },
  5: {
    label: "Non Urgency (รอได้)",
    style: "bg-white text-black border border-gray-300",
  },
};

export default function QueueDashboard() {
  const [queues, setQueues] = useState<any[]>([]);
  const [isCPR, setIsCPR] = useState(false);
  const [callingQueue, setCallingQueue] = useState<any>(null);

  // ใช้เก็บประวัติเวลาที่ถูกเรียก เพื่อป้องกันไม่ให้ระบบส่งเสียงพูดวนลูป
  const lastCalledTimeRef = useRef<number>(0);

  const speakQueue = (queueNumber: string | number, channelName: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // เคลียร์เสียงเก่าทันที

      const textToSpeak = `ขอเชิญหมายเลข ${queueNumber} ที่ ${channelName} ค่ะ`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // ค้นหาเสียงผู้หญิงไทยแบบเจาะลึก (Deep Search)
      const findThaiFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const thaiVoices = voices.filter(
          (voice) => voice.lang === "th-TH" || voice.lang.startsWith("th"),
        );

        if (thaiVoices.length === 0) return null;

        // คีย์เวิร์ดเสียงผู้หญิงเรียงตามลำดับความนุ่มนวล
        const femaleKeywords = [
          "pattarat",
          "narisa",
          "kanya",
          "female",
          "ผู้หญิง",
          "google",
          "microsoft",
        ];

        for (const keyword of femaleKeywords) {
          const match = thaiVoices.find((voice) =>
            voice.name.toLowerCase().includes(keyword),
          );
          if (match) return match;
        }
        return thaiVoices[0]; // แผนสำรอง: ถ้าไม่เจอคำเฉพาะ ให้ใช้เสียงไทยตัวแรก
      };

      const selectedVoice = findThaiFemaleVoice();
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.lang = "th-TH"; // 🇹🇭 ตั้งภาษาเป็นไทย
      utterance.rate = 0.78; // 📉 ลดความเร็วให้พูดชัดและนุ่มขึ้น
      utterance.pitch = 1.15; // 🎚️ ปรับโทนแหลมแบบผู้หญิง
      utterance.volume = 1.0; // 🔊 ดังสูงสุด

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // 🌟 กระตุ้นให้เบราว์เซอร์ (โดยเฉพาะ Chrome) โหลดฐานข้อมูลเสียงภาษาไทยมารอไว้ล่วงหน้า
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    const syncData = () => {
      try {
        // ดึงสถานะจำลองจาก localStorage ที่ส่งมาจากหน้าพยาบาล
        const storedCalling = localStorage.getItem("currentlyCalling");
        const storedCpr = localStorage.getItem("isCprActive");

        const currentCallingObj = storedCalling
          ? JSON.parse(storedCalling)
          : null;
        setIsCPR(storedCpr === "true");
        setCallingQueue(currentCallingObj);

        // 🔥 ตรวจสอบว่าพยาบาลกดเรียกคิวใหม่ หรือกดเรียกซ้ำ (เช็คจาก timestamp)
        if (
          currentCallingObj &&
          currentCallingObj.calledAt > lastCalledTimeRef.current
        ) {
          lastCalledTimeRef.current = currentCallingObj.calledAt; // อัปเดตประวัติเวลาล่าสุด

          // สั่งให้ส่งเสียงเรียก Full Option ออกลำโพงทันที!
          speakQueue(currentCallingObj.no, currentCallingObj.channel);
        }

        // แสดงคิวรอตรวจจากไฟล์ json และเรียงลำดับความรุนแรง (Triage)
        const mappedQueues = mockData
          .map((item: any) => ({
            id: item.vn,
            no: item.oqueue,
            level: item.er_emergency_level_id || 5,
            status: currentCallingObj?.id === item.vn ? "calling" : "waiting",
          }))
          .sort((a, b) => a.level - b.level);

        setQueues(mappedQueues);
      } catch (error) {
        console.error("Failed to sync screen data:", error);
      }
    };

    syncData();
    const interval = setInterval(syncData, 1500); // วนลูปเช็คข้อมูลจากหน้าพยาบาลทุก 1.5 วินาที
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-black text-white font-sans">
      {/* ฝั่งซ้าย: วิดีโอ หรือ หน้าจอ CPR สีแดงวิกฤต */}
      <section className="relative w-1/2 h-full border-r-4 border-gray-800 bg-gray-900">
        {isCPR ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-700 animate-pulse px-10 text-center">
            <h1 className="text-7xl font-black mb-10 leading-tight">
              🚨 กำลังปฏิบัติการ <br />
              ช่วยฟื้นคืนชีพ
            </h1>
            <p className="text-3xl font-bold">
              ทีมแพทย์กำลังเร่งช่วยเหลือเคสฉุกเฉินวิกฤต
            </p>
            <p className="text-3xl mt-4 opacity-80">ขออภัยในความไม่สะดวก</p>
          </div>
        ) : (
          <div className="w-full h-full">
            <iframe
              className="w-full h-full pointer-events-none"
              src="https://www.youtube.com/embed/ScfMTVRdKrk?autoplay=1&mute=1&loop=1&playlist=ScfMTVRdKrk&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="ER Health Education"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
              <p className="text-lg font-bold text-center"></p>
            </div>
          </div>
        )}
      </section>

      {/* ฝั่งขวา: หน้าจอแสดงผลคิวและช่องตรวจ */}
      <section className="w-1/2 h-full flex flex-col bg-gray-50">
        <div className="bg-blue-900 p-4 md:p-6 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            กำลังเรียกตรวจ (NOW CALLING)
          </h2>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-inner w-full max-w-sm mx-auto">
              {callingQueue ? (
                <div className="flex flex-col items-center">
                  <span className="text-7xl font-black text-blue-900 leading-none tracking-tighter">
                    {callingQueue.no}
                  </span>
                  <span className="mt-3 px-6 py-1 bg-amber-500 text-black font-black text-xl rounded-lg animate-bounce">
                    👉 {callingQueue.channel}
                  </span>
                  <span
                    className={`mt-3 px-6 py-1.5 rounded-full text-base font-bold ${TRIAGE_LEVELS[callingQueue.level as keyof typeof TRIAGE_LEVELS]?.style}`}
                  >
                    {
                      TRIAGE_LEVELS[
                        callingQueue.level as keyof typeof TRIAGE_LEVELS
                      ]?.label
                    }
                  </span>
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="text-2xl md:text-3xl font-bold text-gray-300 italic">
                    รอเรียกคิวถัดไป...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
            <span>รายชื่อคิวรอตรวจ (Waiting List)</span>
            <span className="text-lg font-normal text-gray-500">
              ทั้งหมด {queues.length} ราย
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2">
            {queues.map((q) => (
              <div
                key={q.id}
                className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${TRIAGE_LEVELS[q.level as keyof typeof TRIAGE_LEVELS]?.style || "bg-gray-500"}`}
              >
                <div className="flex items-center space-x-6">
                  <span className="text-4xl font-black tracking-wider">
                    {q.no}
                  </span>
                  <div>
                    <p className="text-xs font-bold opacity-75">ความสำคัญ</p>
                    <p className="text-lg font-black leading-tight uppercase">
                      {
                        TRIAGE_LEVELS[
                          q.level as keyof typeof TRIAGE_LEVELS
                        ]?.label.split(" ")[0]
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xl font-bold px-4 py-1.5 rounded-lg ${q.status === "calling" ? "bg-amber-400 text-black animate-pulse" : "bg-black/10"}`}
                  >
                    {q.status === "calling" ? "กำลังเรียก" : "รอตรวจ"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 p-4 border-t border-gray-300">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee text-2xl text-red-600 font-bold">
              ⚠️ ประกาศ: ขณะนี้แผนกฉุกเฉินมีผู้ใช้บริการจำนวนมาก
              เคสสีเขียวและสีขาวอาจมีความล่าช้าในการรอตรวจ ขออภัยในความไม่สะดวก
              ⚠️
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
