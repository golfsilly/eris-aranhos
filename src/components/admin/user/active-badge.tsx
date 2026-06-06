import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface StatusBadgeProps {
  isActive: boolean;
}

export function StatusBadge({
  isActive,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={
        isActive
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          : "bg-slate-500/10 text-slate-600 border-slate-500/20"
      }
    >
      {isActive ? (
        <>
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          Active
        </>
      ) : (
        <>
          <XCircle className="mr-1 h-3.5 w-3.5" />
          Disabled
        </>
      )}
    </Badge>
  );
}