import {
  Shield,
  Stethoscope,
  HeartPulse,
  User,
} from "lucide-react";

import { UserRole } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({
  role,
}: RoleBadgeProps) {
  const config = {
    ADMIN: {
      icon: Shield,
      className:
        "bg-red-500/10 text-red-600 border-red-500/20",
    },

    DOCTOR: {
      icon: Stethoscope,
      className:
        "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },

    NURSE: {
      icon: HeartPulse,
      className:
        "bg-green-500/10 text-green-600 border-green-500/20",
    },

    STAFF: {
      icon: User,
      className:
        "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
  };

  const {
    icon: Icon,
    className,
  } = config[role];

  return (
    <Badge
      variant="outline"
      className={className}
    >
      <Icon className="mr-1 h-3.5 w-3.5" />
      {role}
    </Badge>
  );
}