"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { UserProfileButton } from "@/components/profile-button";
import { APP_CONFIG } from "@/config/app-config";
import { ModeToggle } from "../mode-toggle";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-border bg-background">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative flex size-16 items-center justify-center overflow-hidden bg-background shrink-0">
            <Image
              src="/images/logo-aranhos.png"
              alt="โลโก้โรงพยาบาลอรัญประเทศ"
              width={60}
              height={60}
              className="object-contain w-16 h-16"
            />
          </div>

          <div className="hidden h-8 w-px bg-border sm:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-primary md:text-2xl">
                ERIS
              </h1>

              <Badge
                variant="outline"
                className="h-5 border-border px-1.5 text-[11px] font-semibold"
              >
                {APP_CONFIG.app.version ?? "v?.?.?"}
              </Badge>
            </div>

            <p className="truncate text-xs text-muted-foreground md:text-sm">
              ระบบห้องอุบัติเหตุและฉุกเฉิน โรงพยาบาลอรัญประเทศ
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserProfileButton />
        </div>
      </div>
    </header>
  );
}
