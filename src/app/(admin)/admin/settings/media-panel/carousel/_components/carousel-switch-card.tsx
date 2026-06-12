"use client";

import { useState, useTransition } from "react";

import {
  DatabaseIcon,
  Loader2,
  MonitorPlay,
} from "lucide-react";

import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";

import { toggleCarouselStatus } from "../actions";

interface Props {
  initialValue: boolean;
}

export function CarouselSwitchCard({
  initialValue,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const [enabled, setEnabled] =
    useState(initialValue);

  const handleChange = (checked: boolean) => {
    const previous = enabled;

    // Optimistic UI
    setEnabled(checked);

    startTransition(async () => {
      try {
        const result =
          await toggleCarouselStatus(checked);

        setEnabled(result);

        toast.success(
          result
            ? "เปิดใช้งาน Carousel สำเร็จ"
            : "ปิดใช้งาน Carousel สำเร็จ"
        );
      } catch (error) {
        setEnabled(previous);

        toast.error(
          error instanceof Error
            ? error.message
            : "ไม่สามารถบันทึกข้อมูลได้"
        );
      }
    });
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        enabled
          ? "border-amber-500/40 shadow-sm"
          : "border-border"
      )}
    >
      <div className="flex items-start gap-4 p-6">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            enabled
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              : "bg-muted text-muted-foreground"
          )}
        >
          <MonitorPlay className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            โหมดการแสดงผลหน้าจอ
          </h2>

          <p className="text-sm text-muted-foreground">
            สลับระหว่าง Carousel และ YouTube
          </p>
        </div>

        {isPending && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="border-t px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">
              {enabled
                ? "Carousel เปิดใช้งาน"
                : "YouTube เปิดใช้งาน"}
            </p>

            <p className="text-sm text-muted-foreground">
              {enabled
                ? "ระบบจะแสดงรูปภาพสไลด์"
                : "ระบบจะแสดงวิดีโอ YouTube"}
            </p>
          </div>

          <Switch
            checked={enabled}
            disabled={isPending}
            onCheckedChange={handleChange}
            aria-label="Toggle carousel mode"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-t bg-muted/30 px-6 py-3">
        <DatabaseIcon className="h-3.5 w-3.5 text-muted-foreground" />

        <span className="font-mono text-xs text-muted-foreground">
          mode:
        </span>

        <span
          className={cn(
            "rounded-md px-2 py-1 font-mono text-xs font-medium",
            enabled
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {enabled ? "CAROUSEL" : "YOUTUBE"}
        </span>
      </div>
    </div>
  );
}