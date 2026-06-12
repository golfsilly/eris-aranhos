import { prisma } from "@/lib/prisma";
import { Database, Zap, Images as ImageIcon, Settings2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CarouselSwitchCard } from "./_components/carousel-switch-card";
import { CarouselTable } from "./_components/carousel-table";
import { CarouselFormDialog } from "./_components/carousel-form-dialog";

export default async function CarouselSettingPage() {
  const images = await prisma.carouselImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const setting = await prisma.mediaSetting.findUnique({
    where: { id: "main" },
  });

  const isCarouselActive = setting?.mode === "CAROUSEL";

  return (
    <div className="max-w-7xl space-y-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">ตั้งค่าหน้าจอ Carousel</h1>
        <p className="text-muted-foreground">
          จัดการการแสดงผล Carousel และบริหารจัดการรูปภาพบนหน้าจอทีวี
        </p>
        
        {/* Status Badges */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
            <Database className="h-3 w-3" />
            mediaSetting: <span className="text-primary font-bold">main</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            Real-time Sync
          </div>
        </div>
      </div>

      <Separator />

      {/* Main Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            การตั้งค่าการแสดงผล
          </CardTitle>
          <CardDescription>เปิดหรือปิดการทำงานของ Carousel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CarouselSwitchCard key={setting?.mode} initialValue={isCarouselActive} />
          
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm text-muted-foreground">
              หากเปิดใช้งาน ระบบจะแสดงรูปภาพ Carousel บนหน้าจอทีวี หากปิดใช้งาน 
              ระบบจะสลับไปแสดงผล YouTube แทนโดยอัตโนมัติ
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Images Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              รายการรูปภาพ
            </h2>
            <p className="text-sm text-muted-foreground">จัดการลำดับและรายการรูปภาพทั้งหมด</p>
          </div>
          <CarouselFormDialog />
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <CarouselTable data={images} />
        </div>
      </div>
    </div>
  );
}