"use client";

import Link from "next/link";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "./dot-pattern";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-linear-to-b from-background to-background/80 pt-16 sm:pt-20 pb-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay using reusable component */}
        <DotPattern className="opacity-100" size="md" fadeStyle="ellipse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="outline" className="px-4 py-2 border-foreground">
              <Star className="w-3 h-3 mr-2 fill-current text-primary" />
              Emergency Room Information System
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            ระบบห้อง
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              อุบัติเหตุและฉุกเฉิน{" "}
            </span>
            โรงพยาบาลอรัญประเทศ
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            ระบบสารสนเทศเพื่อสนับสนุนการดูแลผู้ป่วยฉุกเฉิน การติดตามสถานะผู้ป่วย
            การบริหารจัดการเตียง การคัดแยกระดับความรุนแรง
            และการเข้าถึงข้อมูลทางการแพทย์อย่างมีประสิทธิภาพ
            เพื่อยกระดับคุณภาพการให้บริการและความปลอดภัยของผู้ป่วย
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base cursor-pointer px-6" asChild>
              <Link href="/tv2">
                ดูระบบคิว <Play className="ml-2 h-8 w-8" />{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
