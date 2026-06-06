"use client";

import { AlertTriangle } from "lucide-react";

export function CPRAlert() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-red-700 text-white">
      <AlertTriangle className="mb-4 h-32 w-32 animate-pulse" />

      <h1 className="text-6xl font-bold">
        CPR ALERT
      </h1>

      <p className="mt-4 text-3xl">
        ทีมช่วยฟื้นคืนชีพกำลังปฏิบัติงาน
      </p>
    </div>
  );
}