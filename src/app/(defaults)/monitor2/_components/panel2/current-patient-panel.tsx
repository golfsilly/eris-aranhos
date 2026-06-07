"use client";


import { useCurrentPatient } from "@/hooks/waiting-patients-panel/use-current-patient";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function CurrentPatientPanel() {
  const { data: patients = [], isLoading } = useCurrentPatient();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || patients.length <= 2) return;

    let scrollY = 0;
    const scrollSpeed = 0.85;
    let rafId: number;

    const animateScroll = () => {
      scrollY += scrollSpeed;
      container.scrollTop = scrollY;

      if (scrollY >= container.scrollHeight - container.clientHeight - 30) {
        setTimeout(() => {
          scrollY = 0;
          container.scrollTop = 0;
        }, 2000);
      }
      rafId = requestAnimationFrame(animateScroll);
    };

    const timer = setTimeout(animateScroll, 1800);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [patients.length]);

  const getStatusBadge = (p: any) => {
    if (p.observe === "Y") return { text: "สังเกตอาการ", color: "bg-purple-600" };
    if (p.lab_count && p.lab_count > 0) {
      if (p.report_count === p.lab_count) return { text: "ผล Lab ครบแล้ว", color: "bg-emerald-600" };
      return { text: "รอผล Lab", color: "bg-blue-600" };
    }
    return { text: p.tost_name || "กำลังตรวจ", color: "bg-emerald-600" };
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
          <h2 className="text-xl font-semibold text-white">กำลังตรวจอยู่</h2>
        </div>
        <div className="text-sm bg-white/20 px-4 py-1 rounded-full text-white">
          {patients.length} คน
        </div>
      </div>

      {/* Scroll Area - ซ่อน Scrollbar โดยไม่ต้องเพิ่ม CSS */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto"
        style={{
          scrollbarWidth: 'none',           // Firefox
          msOverflowStyle: 'none',          // IE & Edge
        }}
      >
        {/* Chrome, Safari, Edge */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {isLoading ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            กำลังโหลดข้อมูล...
          </div>
        ) : patients.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p className="text-lg">ยังไม่มีผู้ป่วยที่กำลังตรวจ</p>
          </div>
        ) : (
          patients.map((patient, index) => {
            const badge = getStatusBadge(patient);
            return (
              <motion.div
                key={patient.vn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.015 }}
                className="bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl p-5 flex items-center gap-5 border border-slate-700"
              >
                {/* Oqueue */}
                <div className="w-24 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                  <div className="text-4xl font-bold text-black tracking-widest">
                    {patient.oqueue}
                  </div>
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xl font-medium truncate">
                    {patient.fullname}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    ห้องตรวจ {patient.cur_dep || "—"} • {patient.age_y} ปี
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-6 py-3 rounded-2xl text-sm font-medium text-white ${badge.color}`}>
                  {badge.text}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}