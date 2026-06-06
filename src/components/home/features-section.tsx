"use client";

import {
  BarChart3,
  Zap,
  Users,
  ArrowRight,
  Database,
  Package,
  Crown,
  Layout,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image3D } from "./image-3d";

const mainFeatures = [
  {
    icon: Package,
    title: "ระบบคัดกรองผู้ป่วย",
    description: "รองรับการจัดระดับความรุนแรงตามมาตรฐานงานฉุกเฉิน",
  },
  {
    icon: Crown,
    title: "ติดตามสถานะการรักษา",
    description: "แสดงข้อมูลผู้ป่วยและกระบวนการรักษาแบบ Real-time",
  },
  {
    icon: Layout,
    title: "บริหารจัดการทรัพยากร",
    description: "ติดตามเตียง บุคลากร และพื้นที่ให้บริการ",
  },
  {
    icon: Zap,
    title: "แจ้งเตือนทันที",
    description: "รองรับการแจ้งเตือนเหตุการณ์สำคัญและผู้ป่วยวิกฤต",
  },
];

const secondaryFeatures = [
  {
    icon: BarChart3,
    title: "รายงานและสถิติ",
    description: "สรุปข้อมูลผู้ป่วยและตัวชี้วัดสำคัญแบบ Dashboard",
  },
  {
    icon: Palette,
    title: "ใช้งานง่าย",
    description: "ออกแบบหน้าจอให้เหมาะกับการทำงานในสถานการณ์ฉุกเฉิน",
  },
  {
    icon: Users,
    title: "รองรับหลายหน่วยงาน",
    description: "เชื่อมโยงการทำงานระหว่างแพทย์ พยาบาล และเจ้าหน้าที่",
  },
  {
    icon: Database,
    title: "เชื่อมต่อฐานข้อมูลโรงพยาบาล",
    description: "เข้าถึงข้อมูลผู้ป่วยและประวัติการรักษาได้อย่างปลอดภัย",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Badge variant="outline" className="mb-4">
          ระบบสารสนเทศห้องอุบัติเหตุและฉุกเฉิน
        </Badge>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          ครบทุกฟังก์ชันสำหรับการบริหารจัดการผู้ป่วยฉุกเฉิน
        </h2>

        <p className="text-lg text-muted-foreground">
          สนับสนุนการคัดกรองผู้ป่วย การติดตามสถานะการรักษา การจัดการทรัพยากร
          และการวิเคราะห์ข้อมูล เพื่อเพิ่มประสิทธิภาพการให้บริการทางการแพทย์
        </p>

        {/* First Feature Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
          {/* Left Image */}
          {/* <Image3D
            lightSrc="/feature-1-light.png"
            darkSrc="/feature-1-dark.png"
            alt="Analytics dashboard"
            direction="left"
          /> */}
          {/* Right Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                เครื่องมือสำคัญสำหรับงานห้องฉุกเฉิน
              </h3>

              <p className="text-muted-foreground text-base">
                ออกแบบเพื่อสนับสนุนการทำงานของบุคลากรทางการแพทย์
                ลดขั้นตอนการบันทึกข้อมูล
                และเพิ่มความรวดเร็วในการเข้าถึงข้อมูลผู้ป่วย
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors"
                >
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <feature.icon
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pe-4 pt-2">
              <Button size="lg">
                <a href="/auth/signin" className="flex items-center">
                  เข้าสู่ระบบ
                  <ArrowRight className="ms-2 size-4" />
                </a>
              </Button>

              <Button size="lg" variant="outline">
                <a href="#features">ดูรายละเอียดระบบ</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Second Feature Section - Flipped Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                พัฒนาต่อยอดได้อย่างยืดหยุ่น
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                ระบบถูกออกแบบให้สามารถปรับแต่งและพัฒนาต่อยอดได้ง่าย
                รองรับการเพิ่มฟีเจอร์ใหม่ๆ และการเชื่อมต่อกับระบบอื่นๆ ในอนาคต
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {secondaryFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors"
                >
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <feature.icon
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pe-4 pt-2">
              <Button size="lg">
                <a href="#" className="flex items-center">
                  คู่มือการใช้งาน
                  <ArrowRight className="ms-2 size-4" />
                </a>
              </Button>

              <Button size="lg" variant="outline">
                <a href="#">ติดต่อผู้ดูแลระบบ</a>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          {/* <Image3D
            lightSrc="/feature-2-light.png"
            darkSrc="/feature-2-dark.png"
            alt="Performance dashboard"
            direction="right"
            className="order-1 lg:order-2"
          /> */}
        </div>
      </div>
    </section>
  );
}
