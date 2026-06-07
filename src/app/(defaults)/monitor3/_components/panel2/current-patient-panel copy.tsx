"use client";

import { useCurrentPatient } from "@/hooks/waiting-patients-panel/use-current-patient";
import { useEffect, useRef } from "react";

export function CurrentPatientPanel() {
  const { data: patients = [], isLoading } = useCurrentPatient();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || patients.length <= 2) return;

    let scrollPos = 0;
    const speed = 1.5;
    let raf: number;

    const scroll = () => {
      scrollPos += speed;
      container.scrollTop = scrollPos;

      if (scrollPos > container.scrollHeight - container.clientHeight - 20) {
        setTimeout(() => {
          scrollPos = 0;
          container.scrollTop = 0;
        }, 2000);
      }
      raf = requestAnimationFrame(scroll);
    };

    const timer = setTimeout(scroll, 1800);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [patients.length]);

  const getStatusBadge = (p: any) => {
    if (p.observe === "Y") {
      return { text: "สังเกตอาการ", color: "bg-purple-600" };
    }
    if (p.lab_count && p.lab_count > 0) {
      if (p.report_count === p.lab_count) {
        return { text: "ผล Lab ครบแล้ว", color: "bg-emerald-600" };
      }
      return { text: "รอผล Lab", color: "bg-blue-600" };
    }
    if (p.tost_name?.includes("X-Ray") || p.tost_name?.includes("Xray")) {
      return { text: "รอผล X-Ray", color: "bg-violet-600" };
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

      {/* List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 space-y-3 custom-scrollbar"
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            กำลังโหลด...
          </div>
        ) : patients.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p className="text-lg">ยังไม่มีผู้ป่วยที่กำลังตรวจ</p>
          </div>
        ) : (
          patients.map((patient) => {
            const badge = getStatusBadge(patient);
            return (
              <div
                key={patient.vn}
                className="bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl p-5 flex items-center gap-5 border border-slate-700"
              >
                {/* Code / Room Code */}
                <div className="w-24 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black tracking-wider">
                      {patient.oqueue}
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xl font-medium truncate">
                    {patient.fullname}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    ห้องตรวจ {patient.cur_dep || "—"}
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap ${badge.color} text-white`}
                >
                  {badge.text}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
