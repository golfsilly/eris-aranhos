import { AlertCircle } from "lucide-react";
import React from "react";
export default function PublicFooter() {
  return (
    <footer className="h-10 bg-slate-950 border-t border-slate-900 flex items-center overflow-hidden shrink-0 relative">
      <div className="bg-red-600 text-white font-bold px-5 h-full flex items-center text-sm z-10 shadow-xl shrink-0 gap-1.5">
        <AlertCircle className="w-4 h-4 animate-bounce" />
      </div>

      <div className="flex-1 overflow-hidden relative w-full h-full flex items-center">
        <div className="animate-marquee whitespace-nowrap text-sm text-slate-300 font-medium absolute flex items-center gap-20">
          <span>ยินดีต้อนรับสู่ศูนย์บริการห้องฉุกเฉิน</span>
        </div>
      </div>
    </footer>
  );
}


