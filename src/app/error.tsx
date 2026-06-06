"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-slate-900">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
        <div className="flex items-center justify-center rounded-full bg-red-100 p-5 mb-6">
          <AlertCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-6xl font-black text-primary">Error</h1>
        <h2 className="mt-4 text-2xl font-semibold">เกิดข้อผิดพลาดภายในระบบ</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          ระบบไม่สามารถแสดงหน้าได้ขณะนี้ หากยังเกิดปัญหาอยู่
          กรุณาลองรีเฟรชหรือกลับมาหน้าแรกอีกครั้ง
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium">รายละเอียดข้อผิดพลาด:</p>
          <p className="mt-1 truncate text-ellipsis">{error.message}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            ลองอีกครั้ง
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/">กลับหน้าหลัก</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
