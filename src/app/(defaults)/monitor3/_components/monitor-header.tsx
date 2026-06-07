"use client";

import Link from "next/link";
import Image from "next/image";
import { thaiDate } from "@/lib/utils";
import { useClock } from "@/hooks/use-clock";
import { APP_CONFIG } from "@/config/app-config";

export default function MonitorHeader() {
  const time = useClock();

  return (
    <header className="shrink-0 border-b border-white/5 bg-[#0d1626]">
      <div className="flex h-16 items-center justify-between px-5">
        {/* LEFT */}
        <div className="flex items-center gap-3.5">
          <Link href="/" className="group/logo focus:outline-none">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/10 bg-white shadow-md transition-transform duration-150 active:scale-95">
              <Image
                src="/images/logo-aranhos.png"
                alt="โลโก้โรงพยาบาลอรัญประเทศ"
                width={40}
                height={40}
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>

          <div className="h-7 w-px bg-white/8" />

          <div>
            <h1 className="text-[15px] font-semibold leading-tight tracking-[0.01em] text-slate-50">
              ระบบคิวห้องฉุกเฉิน
            </h1>
            <p className="mt-0.5 text-[12px] tracking-[0.02em] text-slate-500">
              {APP_CONFIG.hospital.name.th}
            </p>
          </div>
        </div>

        {/* RIGHT — Clock */}
        <div className="flex items-center gap-3 rounded-[10px] border border-white/6 bg-white/2 px-3 py-1.5">
          {/* Date — ซ้าย */}
          <div className="flex flex-col gap-0.5 border-r border-white/6 pr-3">
            <span className="text-[12px] font-medium tracking-[0.02em] text-slate-200">
              {thaiDate || "กำลังโหลด..."}
            </span>
          </div>

          {/* Digit Blocks — ขวา */}
          <div className="flex items-center gap-0.5">
            {/* HH */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-violet-400/20 bg-white/[0.04] font-mono text-[20px] font-semibold leading-none text-violet-400">
              {time.slice(0, 2)}
            </div>

            <span className="font-mono text-[16px] text-white/10">:</span>

            {/* MM */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/7 bg-white/[0.04] font-mono text-[20px] font-semibold leading-none text-slate-100">
              {time.slice(3, 5)}
            </div>

            <span className="font-mono text-[13px] text-white/10">:</span>

            {/* SS */}
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/5 bg-white/[0.03] font-mono text-[15px] font-semibold leading-none text-slate-500">
              {time.slice(6, 8)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
