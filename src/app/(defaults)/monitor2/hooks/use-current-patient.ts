"use client";

import { useQuery } from "@tanstack/react-query";

export interface CurrentPatient {
  vn: string;
  hn: string;
  oqueue: number;
  vstdate: string;
  vsttime: string;
  cur_dep_time: string;
  ttime: string;
  fullname: string;
  observe: string | null;
  confirm_all: string | null;
  confirm_read_film: string | null;
  lab_count: number | null;
  report_count: number | null;
  age_y: number;
  er_pt_type: number;
  pt_priority_id: number;
  er_emergency_level_id: number;
  er_dch_type_id: number | null;
  cur_dep: string;
  last_dep: string;
  ovstost: string | null;
  tost_name: string | null;

  // === ฟิลด์ที่เพิ่มใหม่ ===
  status: string; // สถานะที่คำนวณแล้วสำหรับแสดงผล
  status_type?: "lab_waiting" | "observed" | "normal";
}

export function useCurrentPatient() {
  return useQuery({
    queryKey: ["currentPatient"],
    queryFn: async (): Promise<CurrentPatient[]> => {
      const res = await fetch("/api/eris-patients/current-patients");

      if (!res.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลผู้ป่วยจาก HOSxP ได้");
      }

      const allPatients: any[] = await res.json();
      
      const currentPatients = allPatients
        .filter((p) => {
          return (
            p.cur_dep === "032" ||
            p.count_oper_code > 0 ||
            p.observe === "Y" ||
            (p.lab_count && p.lab_count > 0) ||
            (p.ovstost !== null && p.ovstost !== "")
          );
        })
        .map((p) => {
          let status = p.tost_name || "ไม่ระบุ";
          let status_type: "lab_waiting" | "observed" | "normal" = "normal";

          // 1. สังเกตอาการ (มี priority สูงกว่า tost_name)
          if (p.observe === "Y" || p.er_dch_type_id === 5) {
            status = "รับไว้สังเกตอาการ";
            status_type = "observed";
          }

          // 2. ตรวจแล็บ
          if (p.lab_count && p.lab_count > 0) {
            if (p.report_count == null || p.report_count < p.lab_count) {
              status = "รอผล Lab";
              status_type = "lab_waiting";
            }
          }

          return {
            ...p,
            status,
            status_type,
          } as CurrentPatient;
        })
        // เรียงตาม Triage Level (เร่งด่วนก่อน) → แล้วตามคิว
        .sort((a, b) => {
          // เรียง Triage ก่อน (เลขน้อย = เร่งด่วนกว่า)
          if (a.er_emergency_level_id !== b.er_emergency_level_id) {
            return a.er_emergency_level_id - b.er_emergency_level_id;
          }
          // ถ้า triage เท่ากัน ให้เรียงตามลำดับคิว
          return a.oqueue - b.oqueue;
        });

      return currentPatients;
    },
    refetchInterval: 8000,
    staleTime: 5000,
  });
}
