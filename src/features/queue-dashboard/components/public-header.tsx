"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { thaiDate } from "@/lib/utils";
import { useClock } from "@/hooks/use-clock";


export function PublicHeader() {
  const time = useClock();
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
      {/* ── Left: Logo + Title ── */}
      <div className="flex items-center gap-3.5">
        {/* Logo รพ */}
        <Link href="/" className="group/logo focus:outline-none">
          <div className="relative w-12 h-12 bg-white rounded-lg p-1.5 shadow-lg overflow-hidden shrink-0 transition-transform duration-200 active:scale-95 group-hover/logo:border-slate-500 border border-transparent">
            <Image
              src="/images/logo-aranhos.png"
              alt="โลโก้โรงพยาบาลอรัญประเทศ"
              width={48}
              height={48}
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-700" />

        {/* Text */}
        <div>
          <h1 className="text-[18px] font-bold text-slate-50 leading-tight tracking-wide">
            ระบบคิวห้องอุบัติเหตุและฉุกเฉิน
          </h1>
          <p className="text-[16px] text-slate-500 mt-0.5 tracking-wider">
            โรงพยาบาลอรัญประเทศ
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800/60 rounded-xl px-4 py-2 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        {/* Clock Section */}
        <div className="flex items-center gap-3">
          {/* ไอคอนนาฬิกาแบบกระพริบตามวินาที */}
          <div className="relative flex items-center justify-center">
            <Clock className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse" />
          </div>

          <div className="flex flex-col items-start">
            {/* ตัวเลขเวลาแบบ Digital Monitor */}
            <div className="text-lg md:text-xl font-mono font-black text-emerald-400 tracking-wider tabular-nums leading-none drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
              {time || "--:--:--"}
            </div>

            {/* วันที่ภาษาไทย ปรับให้อ่านง่ายและดูคลีนขึ้น */}
            <div className="text-sm md:text-md font-medium text-slate-400 mt-1 tracking-wide uppercase flex items-center gap-1">
              {thaiDate || "กำลังโหลด..."}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
