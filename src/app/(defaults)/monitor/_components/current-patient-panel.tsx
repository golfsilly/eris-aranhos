"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCurrentPatient } from "../hooks/use-current-patient";
import { Activity, Beaker, CheckCircle2 } from "lucide-react";

export function CurrentPatientPanel() {
  const { data: patients = [], isLoading } = useCurrentPatient();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ฟังก์ชันสำหรับเบลอชื่อผู้ป่วย (PDPA Masking Logic)
  const maskName = (fullname: string) => {
    if (!fullname) return "—";

    // ลบคำนำหน้านามทั่วไปออกก่อนเพื่อความแม่นยำในการเบลอเนื้อชื่อ
    const cleanName = fullname
      .replace(
        /^(นาย|นาง|นางสาว|เด็กชาย|เด็กหญิง|พระครู|พระ|น\.ส\.|ด\.ช\.|ด\.ญ\.)/g,
        "",
      )
      .trim();

    const parts = cleanName.split(" ");
    const firstName = parts[0] || "";
    const lastName = parts[1] || "";

    // 1. จัดการชื่อจริง: แสดง 3 ตัวแรก ที่เหลือใส่ **
    let maskedFirst = firstName;
    if (firstName.length > 3) {
      maskedFirst = firstName.substring(0, 3) + "**";
    } else if (firstName.length > 0) {
      maskedFirst = firstName + "**";
    }

    // 2. จัดการนามสกุล: แสดงตัวแรก ที่เหลือใส่ ***
    let maskedLast = "";
    if (lastName) {
      maskedLast = " " + lastName.substring(0, 1) + "***";
    }

    return maskedFirst + maskedLast;
  };

  // Auto Scroll Engine
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || patients.length <= 3) return;

    let scrollY = 0;
    const scrollSpeed = 0.6;
    let rafId: number;

    const animateScroll = () => {
      scrollY += scrollSpeed;
      container.scrollTop = scrollY;

      if (scrollY >= container.scrollHeight - container.clientHeight - 20) {
        setTimeout(() => {
          scrollY = 0;
          container.scrollTop = 0;
        }, 3000);
      }
      rafId = requestAnimationFrame(animateScroll);
    };

    const timer = setTimeout(animateScroll, 2000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [patients.length]);

  const getTriageInfo = (level: number) => {
    switch (level) {
      case 1: // CRITICAL - แดงเข้มสดชัด (แดงเพลิง)
        return {
          badge:
            "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400",
          glow: " border-l-8 border-l-red-600 bg-red-950/40 ring-1 ring-red-500/40",
          text: "CRITICAL • กู้ชีพทันที (Level 1)",
        };

      case 2: // EMERGENCY - ชมพูแดง (ปรับให้อมม่วง + สดขึ้น)
        return {
          badge:
            "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/25 ring-2 ring-pink-400",
          glow: "border-l-8 border-l-pink-500 bg-pink-950/35 ring-1 ring-pink-500/30",
          text: "EMERGENCY • ฉุกเฉิน (Level 2)",
        };

      case 3: // URGENT
        return {
          badge:
            "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/20",
          glow: " border-l-8 border-l-amber-500 bg-amber-950/30 ring-1 ring-amber-500/30",
          text: "URGENT • ด่วนมาก (Level 3)",
        };

      case 4: // SEMI-URGENT
        return {
          badge:
            "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20",
          glow: " border-l-8 border-l-emerald-500 bg-emerald-950/25 ring-1 ring-emerald-500/30",
          text: "SEMI-URGENT • ด่วน (Level 4)",
        };

      case 5: // NON-URGENT
        return {
          badge: "bg-slate-700 text-slate-100 shadow-sm",
          glow: " border-l-8 border-l-slate-100 bg-slate-950/30",
          text: "NON-URGENT • รอได้ (Level 5)",
        };

      default:
        return {
          badge: "bg-slate-800 text-slate-300",
          glow: " border-l-8 border-l-slate-700",
          text: `ระดับที่ ${level}`,
        };
    }
  };

  // Status Badge Mapper
  const getStatusBadge = (p: any) => {
    if (p.status_type === "observed") {
      return {
        text: p.status,
        color:
          "bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse",
        icon: <Activity className="w-4 h-4 text-purple-400 shrink-0" />,
      };
    }
    if (p.status_type === "lab_waiting") {
      return {
        text: p.status,
        color: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        icon: <Beaker className="w-4 h-4 text-blue-400 shrink-0" />,
      };
    }
    return {
      text: p.status || "กำลังตรวจ",
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    };
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl font-sans">
      {/* Header Panel - ล้ำแต่ Compact */}
      <div className="bg-slate-950/90 backdrop-blur-xl border-b border-slate-700/70 px-6 py-3 flex items-center justify-between shrink-0 relative overflow-hidden">
        {/* Subtle Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="flex items-center gap-3">
          {/* Neon Status */}
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-1 ring-emerald-400/60"></span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
              ห้องฉุกเฉิน
              <span className="text-emerald-400 text-sm font-mono font-medium tracking-widest">
                (ER)
              </span>
            </h2>
          </div>
        </div>

        {/* Patient Count - Compact Cyber Style */}
        <div className="flex items-center gap-2.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl px-4 py-2 shadow-md shadow-emerald-500/10">
          <Activity className="w-4 h-4 text-emerald-400" />
          <div className="text-sm font-semibold text-slate-300">
            กำลังรักษา{" "}
            <span className="text-emerald-400 font-bold text-base font-mono tabular-nums ml-1">
              {patients.length}
            </span>{" "}
            ราย
          </div>
        </div>
      </div>

      {/* Patient Cards Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">
              กำลังดึงข้อมูลแบบ Real-time...
            </p>
          </div>
        ) : patients.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
            <div className="p-4 bg-slate-900 rounded-full mb-3 text-2xl">
              🏥
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ไม่มีผู้ป่วยกำลังตรวจในขณะนี้
            </p>
          </div>
        ) : (
          patients.map((patient, index) => {
            const badge = getStatusBadge(patient);
            const triage = getTriageInfo(patient.er_emergency_level_id);

            return (
              <motion.div
                key={patient.vn}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                }}
                className={`bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-200 ${triage.glow}`}
              >
                {/* LEFT: OQUEUE BLOCK & PATIENT INFO */}
                <div className="flex items-center gap-5 min-w-0 flex-1">
                  {/* คิวคนไข้ */}
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-lg">
                    <span className="text-[14px] uppercase tracking-wider text-slate-400 font-bold -mb-0.5">
                      ER
                    </span>
                    <span className="text-3xl font-black text-amber-400 tracking-tight">
                      {patient.oqueue}
                    </span>
                  </div>

                  {/* ข้อมูลทั่วไป */}
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {/* เรียกใช้งานฟังก์ชัน maskName เพื่อแสดงผลชื่อแบบ PDPA */}
                      <h3 className="text-xl font-bold text-slate-100 tracking-wide truncate max-w-[200px] sm:max-w-none">
                        {maskName(patient.fullname)}
                      </h3>
                      <span className="text-xs text-slate-300 font-semibold bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded">
                        {patient.age_y} ปี
                      </span>
                    </div>

                    <div className="flex">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border border-transparent ${triage.badge}`}
                      >
                        {triage.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: STATUS BADGE + ICON */}
                <div className="shrink-0 flex items-center justify-end pl-2">
                  <div
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border tracking-wide shadow-sm flex items-center justify-center gap-2 min-w-[130px] ${badge.color}`}
                  >
                    {badge.icon}
                    <span>{badge.text}</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
