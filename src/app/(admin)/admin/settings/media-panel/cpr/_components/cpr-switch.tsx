"use client";

import { AlertCircleIcon, CheckCircleIcon, DatabaseIcon, HeartPulseIcon } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { toggleCprStatus } from "../actions";

interface CprSwitchProps {
  initialIsCprActive: boolean;
}

export default function CprSwitch({ initialIsCprActive }: CprSwitchProps) {
  const [isCprActive, setIsCprActive] = useState(initialIsCprActive);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback(async () => {
    if (status === "saving") return;
    setStatus("saving");
    setErrorMsg(null);

    try {
      const updated = await toggleCprStatus(!isCprActive);
      setIsCprActive(updated);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการบันทึกสถานะ CPR");
      setStatus("error");
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setStatus("idle"), 3500);
    }
  }, [isCprActive, status]);

  const isSaving = status === "saving";

  return (
    <div
      data-active={isCprActive}
      className={[
        "rounded-[20px] border bg-card overflow-hidden transition-all duration-300",
        isCprActive
          ? "border-emerald-500/60 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]"
          : "border-border",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 pb-4">
        <div
          className={[
            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-400",
            isCprActive ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-muted",
          ].join(" ")}
        >
          <HeartPulseIcon
            className={[
              "w-5 h-5 transition-colors duration-400",
              isCprActive
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-muted-foreground",
            ].join(" ")}
          />
        </div>
        <div>
          <h2 className="text-[17px] font-semibold leading-snug">สวิตช์หน้าจอ CPR</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            ควบคุมการแสดงผล CPR บนระบบทีวี
          </p>
        </div>
      </div>

      <div className="h-px bg-border mx-6" />

      {/* Toggle row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <StatusPill active={isCprActive} />
        <button
          role="switch"
          aria-checked={isCprActive}
          aria-label="เปิด/ปิดหน้าจอ CPR"
          disabled={isSaving}
          onClick={handleToggle}
          className={[
            "relative w-13 h-7.5 rounded-full border transition-all duration-350 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0",
            isCprActive
              ? "bg-emerald-500 border-emerald-500"
              : "bg-muted border-border",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1 w-5.5 h-5.5 rounded-full bg-white shadow-sm transition-all duration-300",
              isCprActive ? "left-6.5" : "left-1",
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
                "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
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
              {status === "success" && "สถานะ CPR ถูกบันทึกแล้ว"}
              {status === "error" && (errorMsg ?? "เกิดข้อผิดพลาดในการบันทึก")}
            </span>
          </div>
        </div>
      )}

      {/* DB badge */}
      <div className="flex items-center gap-2 px-6 py-3 border-t border-border">
        <DatabaseIcon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[12px] text-muted-foreground font-mono">isCprActive:</span>
        <span
          className={[
            "text-[12px] font-mono font-medium px-2 py-0.5 rounded-md transition-all duration-300",
            isCprActive
              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {String(isCprActive)}
        </span>
      </div>
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium transition-all duration-400",
        active
          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
          : "bg-muted text-muted-foreground",
      ].join(" ")}
    >
      <span
        className={[
          "w-1.5 h-1.5 rounded-full shrink-0",
          active ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40",
        ].join(" ")}
      />
      {active ? "เปิดอยู่" : "ปิดอยู่"}
    </div>
  );
}