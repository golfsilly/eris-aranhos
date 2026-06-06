"use client";

import { AlertCircleIcon, CheckCircleIcon, DatabaseIcon, Zap } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { toggleCarouselStatus } from "../actions";

interface CarouselSliderProps {
  initialIsCarouselActive: boolean;
}

export default function CarouselSlider({ initialIsCarouselActive }: CarouselSliderProps) {
  const [isCarouselActive, setIsCarouselActive] = useState(initialIsCarouselActive);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback(async () => {
    if (status === "saving") return;
    setStatus("saving");
    setErrorMsg(null);

    try {
      const updated = await toggleCarouselStatus(!isCarouselActive);
      setIsCarouselActive(updated);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการบันทึกสถานะ Carousel");
      setStatus("error");
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setStatus("idle"), 3500);
    }
  }, [isCarouselActive, status]);

  const isSaving = status === "saving";

  return (
    <div
      data-active={isCarouselActive}
      className={[
        "rounded-[20px] border bg-card overflow-hidden transition-all duration-300",
        isCarouselActive
          ? "border-amber-500/60 shadow-[0_0_0_1px_rgba(217,119,6,0.15)]"
          : "border-border",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 pb-4">
        <div
          className={[
            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-400",
            isCarouselActive ? "bg-amber-100 dark:bg-amber-900/40" : "bg-muted",
          ].join(" ")}
        >
          <Zap
            className={[
              "w-5 h-5 transition-colors duration-400",
              isCarouselActive
                ? "text-amber-700 dark:text-amber-400"
                : "text-muted-foreground",
            ].join(" ")}
          />
        </div>
        <div>
          <h2 className="text-[17px] font-semibold leading-snug">สวิตช์หน้าจอ Carousel</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            ควบคุมการแสดงผล Carousel บนระบบทีวี
          </p>
        </div>
      </div>

      <div className="h-px bg-border mx-6" />

      {/* Toggle row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <StatusPill active={isCarouselActive} />
        <button
          role="switch"
          aria-checked={isCarouselActive}
          aria-label="เปิด/ปิดหน้าจอ Carousel"
          disabled={isSaving}
          onClick={handleToggle}
          className={[
            "relative w-13 h-7.5 rounded-full border transition-all duration-350 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0",
            isCarouselActive
              ? "bg-amber-500 border-amber-500"
              : "bg-muted border-border",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1 w-5.5 h-5.5 rounded-full bg-white shadow-sm transition-all duration-300",
              isCarouselActive ? "left-6.5" : "left-1",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Toast area */}
      {status !== "idle" && (
        <div className="px-6 pb-4 animate-in slide-in-from-top-1 duration-200">
          <div
            className={[
              "flex items-center gap-2 text-[13px] rounded-xl px-4 py-3 border",
              status === "saving" &&
                "bg-muted text-muted-foreground border-border",
              status === "success" &&
                "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
              status === "error" &&
                "bg-destructive/10 text-destructive border-destructive/20",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {status === "saving" && (
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
            )}
            {status === "success" && <CheckCircleIcon className="w-4 h-4 shrink-0" />}
            {status === "error" && <AlertCircleIcon className="w-4 h-4 shrink-0" />}
            <span>
              {status === "saving" && "กำลังบันทึก..."}
              {status === "success" && "สถานะ Carousel ถูกบันทึกแล้ว"}
              {status === "error" && (errorMsg ?? "เกิดข้อผิดพลาดในการบันทึก")}
            </span>
          </div>
        </div>
      )}

      {/* DB badge */}
      <div className="flex items-center gap-2 px-6 py-3 border-t border-border">
        <DatabaseIcon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[12px] text-muted-foreground font-mono">mode:</span>
        <span
          className={[
            "text-[12px] font-mono font-medium px-2 py-0.5 rounded-md transition-all duration-300",
            isCarouselActive
              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {isCarouselActive ? "CAROUSEL" : "YOUTUBE"}
        </span>
      </div>
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300",
        active
          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          : "bg-destructive/10 text-destructive border-destructive/20",
      ].join(" ")}
    >
      <span className={["w-2 h-2 rounded-full", active ? "bg-amber-500" : "bg-destructive"].join(" ")} />
      {active ? "เปิด" : "ปิด"}
    </div>
  );
}

