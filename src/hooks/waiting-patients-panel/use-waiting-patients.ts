"use client";

import { useQuery } from "@tanstack/react-query";

export interface WaitingPatient {
  vn: string;
  hn: string;
  oqueue: number;
  vstdate: string;
  vsttime: string;
  fullname: string;
  age_y: number;
  cur_dep: string;
  last_dep: string;
  ovstost: string | null;
  tost_name: string | null;
}

export function useWaitingPatients() {
  return useQuery({
    queryKey: ["waitingPatients"],
    queryFn: async (): Promise<WaitingPatient[]> => {
      try {
        const res = await fetch("/data/waiting-patients.json");
        if (res.ok) return res.json();
      } catch (e) {
        console.warn("ใช้ mock data แทน");
      }

      // Mock data (ข้อมูลที่คุณให้มา)
      return [ /* วางข้อมูล JSON ทั้งหมดที่นี่ */ ];
    },
    refetchInterval: 10000,
  });
}