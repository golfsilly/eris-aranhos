import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingProps {
  message?: string;
  className?: string;
}

export default function Loading({
  message = "กำลังโหลดข้อมูล",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />

      {/* Floating Blur */}
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/20 bg-card shadow-2xl">
            <Image
              src="/images/logo-aranhos.png"
              alt="Aranyaprathet Hospital"
            width={60}
            height={60}
            className="object-contain p-1"
            />
          </div>
        </div>

        {/* Spinner */}
        <div className="relative mb-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold tracking-wide">{message}</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Emergency Room Information System
        </p>

        {/* Animated Dots */}
        <div className="mt-4 flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
