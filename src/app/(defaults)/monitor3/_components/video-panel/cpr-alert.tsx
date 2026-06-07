"use client";

import { Heart, AlertTriangle } from "lucide-react";

export function CPRAlert() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black select-none p-4">
      {/* 1. ไซเรนหมุนพื้นหลัง */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen animate-[spin_4s_linear_infinite]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[40vw] bg-linear-to-r from-red-600/20 via-transparent to-red-600/20 blur-3xl transform rotate-45" />
      </div>

      {/* 2. ไฟแฟลชกระพริบฉุกเฉิน */}
      <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

      {/* 3. คลื่นพลังเรดาร์ (เปลี่ยนเป็น % ป้องกันการล้นหน้าจอ) */}
      <div className="absolute w-[80vw] h-[80vw] max-w-120 max-h-120 rounded-full border border-red-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <div className="absolute w-screen h-[100vw] max-w-180 max-h-180 rounded-full border border-red-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />

      {/* กล่องข้อความหลัก */}
      <div className="relative z-10 text-center w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        {/* ไอคอนแจ้งเตือน */}
        <div className="mb-4 md:mb-6 flex items-center justify-center animate-[bounce_2s_infinite]">
          <div className="relative p-3 md:p-4 rounded-full bg-red-950/40 border border-red-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="w-10 h-10 md:w-14 md:h-14 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <div className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-ping" />
          </div>
        </div>

        {/* หัวข้อ CPR & Heartbeat */}
        <div className="mb-4 md:mb-6 w-full animate-[fadeIn_0.8s_ease-out]">
          <div className="h-0.5 md:h-0.75 w-24 md:w-48 mx-auto bg-linear-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,1)]" />
        </div>

        {/* ข้อความหลัก - ใช้หน่วย vw เพื่อบีบฟอนต์ตามความกว้างจอ 100% ไม่ล้นแน่นอน */}
        <div className="w-full flex flex-col gap-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] animate-[translateY_1s_ease-out]">
          <h1 className="text-white text-[9vw] md:text-4xl font-black tracking-wide uppercase leading-tight break-keep">
            ขณะนี้กำลังปฏิบัติการ
          </h1>
          <h1 className="text-red-500 text-[10vw] md:text-4xl font-black tracking-wide uppercase leading-tight drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] break-keep">
            ช่วยฟื้นคืนชีพ
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
          <Heart className="w-[6vw] h-[6vw] max-w-10 max-h-10 text-red-500 fill-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-[ping_1s_ease-in-out_infinite]" />
          <Heart className="w-[6vw] h-[6vw] max-w-10 max-h-10 text-red-500 fill-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-[ping_1s_ease-in-out_infinite]" />
          <Heart className="w-[6vw] h-[6vw] max-w-10 max-h-10 text-red-500 fill-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-[ping_1s_ease-in-out_infinite]" />
          <Heart className="w-[6vw] h-[6vw] max-w-10 max-h-10 text-red-500 fill-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-[ping_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
