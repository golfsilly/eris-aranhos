"use client";

import { useWaitingPatients } from "@/hooks/waiting-patients-panel/use-waiting-patients";



export function WaitingPatientPanel() {
  const { data: patients = [], isLoading } = useWaitingPatients();

  return (
    <div className="h-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="bg-amber-600 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-white rounded-full" />
          <h2 className="text-lg font-semibold text-white">รอตรวจ / คิวต่อไป</h2>
        </div>
        <div className="text-sm bg-amber-700 px-3 py-1 rounded-full">
          {patients.length} คน
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-auto p-4 space-y-3 custom-scrollbar min-h-0">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            กำลังโหลด...
          </div>
        ) : patients.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10">
            <div className="text-5xl mb-4 opacity-30">📋</div>
            <p>ไม่มีผู้ป่วยรอตรวจในขณะนี้</p>
          </div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.vn}
              className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl p-4 flex gap-4 items-center"
            >
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-lg font-bold text-slate-300 shrink-0">
                {patient.oqueue}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-100 truncate">
                  {patient.fullname}
                </div>
                <div className="text-sm text-slate-400 flex items-center gap-2 truncate">
                  <span>HN: {patient.hn}</span>
                  <span>•</span>
                  <span>{patient.age_y} ปี</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">สถานะ</div>
                <div className="text-sm font-medium text-amber-400">
                  {patient.tost_name || "รอตรวจ"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-3 text-xs text-slate-400 text-center shrink-0">
        อัพเดทข้อมูลทุก 10 วินาที
      </div>
    </div>
  );
}