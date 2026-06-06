import { Loader2, Video } from "lucide-react";

export function VideoLoading() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-radial-to-br from-muted/40 via-background to-muted/20">
      {/* Animated glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,hsl(var(--primary)/0.15)_25%,transparent_50%)]" />
      </div>

      {/* Skeleton shimmer bar */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,hsl(var(--foreground)/0.05)_50%,transparent_70%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />

      {/* Icon + spinner */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm ring-1 ring-primary/20">
            <Video className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="tracking-wide">กำลังโหลดวิดีโอ...</span>
        </div>
      </div>
    </div>
  );
}