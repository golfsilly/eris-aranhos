import { prisma } from "@/lib/prisma";
import { Database, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CarouselSlider from "./_components/carousel-slider";

export default async function CarouselSettingPage() {
  const setting = await prisma.mediaSetting.findUnique({
    where: { id: "main" },
  });

  return (
    <div className="max-w-2xl space-y-7">
      {/* Page header */}
      <div className="space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground font-mono">
          <span>ตั้งค่า</span>
          <span>/</span>
          <span>หน้าจอ Carousel</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-[22px] font-bold tracking-tight">
            ตั้งค่าหน้าจอ Carousel
          </h1>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            เปิดหรือปิดการแสดงหน้าจอ Carousel และบันทึกสถานะลงฐานข้อมูล
          </p>
        </div>

        {/* Metadata badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
            <Database className="w-3 h-3" />
            mediaSetting · main
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            real-time
          </span>
        </div>
      </div>

      <Separator />

      {/* Toggle card */}
      <CarouselSlider
        initialIsCarouselActive={setting?.mode === "CAROUSEL" ?? false}
      />

      {/* Info note */}
      <div className="flex items-start gap-3 rounded-xl bg-muted px-4 py-3.5">
        <Zap className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          เปิด Carousel เพื่อแสดงรูปภาพสไลด์โชว์บนจอทีวี
        </p>
      </div>
    </div>
  );
}
