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
  count_oper_code: number;
  observe: string | null;      // ในข้อมูลเป็น null
  confirm_all: string | null;  // ในข้อมูลเป็น null
  lab_count: number | null;    // ในข้อมูลเป็น null
  report_count: number | null; // ในข้อมูลเป็น null
  age_y: number;
  bps: number | null;          // เผื่อกรณีไม่มีการวัดสัญญาณชีพ
  bpd: number | null;
  pulse: number | null;
  temperature: number | null;
  pre_pain_score: number;      // เพิ่มเติมจากข้อมูลจริง
  o2sat: number | null;        // เพิ่มเติมจากข้อมูลจริง (ในข้อมูลเป็น null)
  rr: number;                  // เพิ่มเติมจากข้อมูลจริง
  EVM: number;                 // เพิ่มเติมจากข้อมูลจริง
  er_pt_type: number;          // เพิ่มเติมจากข้อมูลจริง
  pt_priority_id: number;      // เพิ่มเติมจากข้อมูลจริง
  er_emergency_level_id: number;
  er_dch_type_id: number | null; // เพิ่มเติมจากข้อมูลจริง (ในข้อมูลเป็น null)
  cur_dep: string;
  last_dep: string;            // เพิ่มเติมจากข้อมูลจริง
  ovstost: string;             // ในข้อมูลเป็น "00" (string)
  tost_name: string;           // ในข้อมูลเป็น "รอผลตรวจ" (string)
}

export function useCurrentPatient() {
  return useQuery({
    queryKey: ["currentPatient"],
    queryFn: async (): Promise<CurrentPatient[]> => {
      try {
        const res = await fetch("/data/waiting-patients.json");
        if (!res.ok) throw new Error("Failed to fetch");

        const allPatients: any[] = await res.json();

        // ===== กรองเฉพาะผู้ป่วยที่กำลังตรวจอยู่ =====
        const currentPatients = allPatients
          .filter((p) => {
            // อยู่ในห้องตรวจหลัก หรือมีการดำเนินการแล้ว
            return (
              p.cur_dep === "032" ||
              p.count_oper_code > 0 ||
              p.observe === "Y" ||
              (p.lab_count && p.lab_count > 0)
            );
          })
          .sort((a, b) => a.oqueue - b.oqueue); // เรียงตามคิว

        return currentPatients;
      } catch (error) {
        console.warn("ใช้ข้อมูลจำลองสำหรับ Current Patient");

        // Mock Data (กรณีโหลด JSON ไม่ได้)
        return [
          {
            vn: "690607000100",
            hn: "540238231",
            oqueue: 158,
            vstdate: "7/6/2026",
            vsttime: "12:51:28",
            cur_dep_time: "13:26:05",
            ttime: "02:59",
            fullname: "นางอังคณา สุขประทุม",
            count_oper_code: 0,
            observe: null,
            confirm_all: null,
            lab_count: null,
            report_count: null,
            age_y: 57,
            bps: 0.0,
            bpd: 0.0,
            pulse: 0.0,
            temperature: 0.0,
            pre_pain_score: 0,
            o2sat: null,
            rr: 0.0,
            EVM: 0.0,
            er_pt_type: 4,
            pt_priority_id: 5,
            er_emergency_level_id: 5,
            er_dch_type_id: null,
            cur_dep: "999",
            last_dep: "212",
            ovstost: "00",
            tost_name: "รอผลตรวจ",
          },
          {
            vn: "690607000103",
            hn: "590318781",
            oqueue: 161,
            vstdate: "7/6/2026",
            vsttime: "13:13:44",
            cur_dep_time: "13:38:42",
            ttime: "02:46",
            fullname: "ด.ช.ธนภัทร พุกเลี้ยง",
            count_oper_code: 2,
            observe: null,
            confirm_all: null,
            lab_count: null,
            report_count: null,
            age_y: 10,
            bps: 112.0,
            bpd: 68.0,
            pulse: 98.0,
            temperature: 36.9,
            pre_pain_score: 0,
            o2sat: 100.0,
            rr: 20.0,
            EVM: 15.0,
            er_pt_type: 2,
            pt_priority_id: 5,
            er_emergency_level_id: 5,
            er_dch_type_id: null,
            cur_dep: "202",
            last_dep: "032",
            ovstost: "98",
            tost_name: "รอรับยา",
          },
          {
            vn: "690607000104",
            hn: "420026090",
            oqueue: 162,
            vstdate: "7/6/2026",
            vsttime: "13:20:13",
            cur_dep_time: "13:30:14",
            ttime: "02:54",
            fullname: "นายสรายุทธ์ สิงห์ธงยาม",
            count_oper_code: 0,
            observe: null,
            confirm_all: null,
            lab_count: null,
            report_count: null,
            age_y: 33,
            bps: 127.0,
            bpd: 65.0,
            pulse: 98.0,
            temperature: 36.7,
            pre_pain_score: 0,
            o2sat: null,
            rr: 20.0,
            EVM: 0.0,
            er_pt_type: 3,
            pt_priority_id: 4,
            er_emergency_level_id: 4,
            er_dch_type_id: null,
            cur_dep: "202",
            last_dep: "032",
            ovstost: "00",
            tost_name: "รอผลตรวจ",
          },
          {
            vn: "690607000105",
            hn: "520210280",
            oqueue: 187,
            vstdate: "7/6/2026",
            vsttime: "13:37:28",
            cur_dep_time: "13:41:46",
            ttime: "02:43",
            fullname: "นางผกายมาศ คำแหง",
            count_oper_code: 0,
            observe: null,
            confirm_all: null,
            lab_count: null,
            report_count: null,
            age_y: 52,
            bps: 102.0,
            bpd: 58.0,
            pulse: 80.0,
            temperature: 36.9,
            pre_pain_score: 0,
            o2sat: null,
            rr: 20.0,
            EVM: 0.0,
            er_pt_type: 4,
            pt_priority_id: 5,
            er_emergency_level_id: 5,
            er_dch_type_id: null,
            cur_dep: "032",
            last_dep: "032",
            ovstost: "00",
            tost_name: "รอผลตรวจ",
          },
          {
            vn: "690607000109",
            hn: "510193597",
            oqueue: 192,
            vstdate: "7/6/2026",
            vsttime: "14:31:32",
            cur_dep_time: "15:41:12",
            ttime: "00:43",
            fullname: "น.ส.นิภาวรรณ สายทอง",
            count_oper_code: 2,
            observe: "Y",
            confirm_all: "Y",
            lab_count: 2,
            report_count: 2,
            age_y: 18,
            bps: 104.0,
            bpd: 60.0,
            pulse: 96.0,
            temperature: 37.1,
            pre_pain_score: 0,
            o2sat: null,
            rr: 20.0,
            EVM: 0.0,
            er_pt_type: 3,
            pt_priority_id: 3,
            er_emergency_level_id: 3,
            er_dch_type_id: 5,
            cur_dep: "032",
            last_dep: "032",
            ovstost: null,
            tost_name: null,
          },
          {
            vn: "690607000110",
            hn: "650385753",
            oqueue: 193,
            vstdate: "7/6/2026",
            vsttime: "14:59:17",
            cur_dep_time: "15:03:31",
            ttime: "01:21",
            fullname: "ด.ช.ชนกันต์ มานะเฝ้า",
            count_oper_code: 1,
            observe: null,
            confirm_all: null,
            lab_count: null,
            report_count: null,
            age_y: 3,
            bps: 0.0,
            bpd: 0.0,
            pulse: 0.0,
            temperature: 0.0,
            pre_pain_score: 0,
            o2sat: null,
            rr: 0.0,
            EVM: 0.0,
            er_pt_type: 4,
            pt_priority_id: 5,
            er_emergency_level_id: 5,
            er_dch_type_id: null,
            cur_dep: "032",
            last_dep: "032",
            ovstost: "00",
            tost_name: "รอผลตรวจ",
          },
          {
            vn: "690607142405",
            hn: "640361874",
            oqueue: 191,
            vstdate: "7/6/2026",
            vsttime: "14:24:05",
            cur_dep_time: "15:38:35",
            ttime: "00:46",
            fullname: "นายไพรสาร ทันไชย",
            count_oper_code: 0,
            observe: null,
            confirm_all: "Y",
            lab_count: null,
            report_count: null,
            age_y: 53,
            bps: 123.0,
            bpd: 75.0,
            pulse: 96.0,
            temperature: 36.9,
            pre_pain_score: 0,
            o2sat: 98.0,
            rr: 20.0,
            EVM: 15.0,
            er_pt_type: 2,
            pt_priority_id: 0,
            er_emergency_level_id: 3,
            er_dch_type_id: 5,
            cur_dep: "032",
            last_dep: "001",
            ovstost: null,
            tost_name: null,
          },
        ];
      }
    },
    refetchInterval: 8000, // รีเฟรชทุก 8 วินาที
    staleTime: 5000,
  });
}
