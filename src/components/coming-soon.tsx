"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction, Rocket } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 md:p-6">
      {/* 🌌 Background Decorative Circles (วงกลมตกแต่งพื้นหลังแอบเคลื่อนไหวช้าๆ) */}
      <div className="absolute top-1/4 left-1/4 -z-10 size-72 rounded-full bg-primary/5 blur-3xl animate-pulse animation-duration:[8s]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 size-96 rounded-full bg-chart-2/5 blur-3xl animate-pulse animation-duration:[12s]" />

      <div className="w-full max-w-xl text-center space-y-6">
        {/* 🚀 Icon & Badge Area */}
        <div className="flex flex-col items-center justify-center gap-2">
          {/* ใช้ ตัวยึดแบบลอยนุ่มๆ (Hover/Float) ด้วยการทวีคูณความเนียนด้วย animate-bounce แบบหน่วงเวลา */}
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-bounce animation-duration:[3s]">
            <Rocket className="size-8 transform -rotate-12 transition-transform duration-500 hover:rotate-12" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-xs font-medium text-muted-foreground border border-border transition-all hover:border-amber-500/50">
            {/* ไอคอนค้อนกะพริบแจ้งเตือนว่ากำลังสร้างด้วย animate-pulse */}
            <Construction className="size-4 text-amber-500 animate-pulse" />
            Under Construction
          </span>
        </div>

        {/* 📝 Typography */}
        <div className="space-y-3">
          {/* ตัวอักษร Coming Soon ค่อยๆ เลื่อนขึ้นสั้นๆ ตอนโหลดหน้า (ถ้าใช้ Tailwind v4 สามารถเพิ่ม transition ได้เลย) */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent transform transition-all duration-700 hover:scale-[1.02]">
            Coming Soon
          </h1>
          <p className="mx-auto max-w-md text-base text-muted-foreground">
            หน้าเพจนี้กำลังอยู่ระหว่างการพัฒนาอย่างพิถีพิถันเพื่อมอบประสบการณ์ที่ดีที่สุดให้กับคุณ
            อดใจรออีกไม่นาน!
          </p>
        </div>

        {/* 🔗 Back Button */}
        <div className="pt-2">
          <Link href="/">
            {/* ปุ่มกดเพิ่มเอฟเฟกต์ยุบตัวตอนคลิก (active:scale-95) */}
            <Button
              variant="outline"
              className="gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:shadow-md active:scale-95 border-border"
            >
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
