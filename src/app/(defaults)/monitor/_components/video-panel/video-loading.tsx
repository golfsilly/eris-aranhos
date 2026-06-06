"use client";

import { Loader2 } from "lucide-react";

export function VideoLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-white">
      <Loader2 className="h-12 w-12 animate-spin" />

      <p className="mt-4 text-xl">
        Loading Media...
      </p>
    </div>
  );
}