"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type UserRoleFilter = UserRole | "ALL";

interface Props {
  search: string;
  role: UserRoleFilter;
}

export default function UserToolbar({ search, role }: Props) {
  const router = useRouter();

  const updateQuery = (value: string, roleValue: string) => {
    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("search", value);
    }

    if (roleValue && roleValue !== "ALL") {
      params.set("role", roleValue);
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          defaultValue={search}
          placeholder="ค้นหาผู้ใช้งาน"
          className="pl-9"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateQuery(e.currentTarget.value, role);
            }
          }}
        />
      </div>

      <Select
        value={role}
        onValueChange={(value) => updateQuery(search, value)}
      >
        <SelectTrigger className="w-50">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">ทั้งหมด</SelectItem>

          <SelectItem value="ADMIN">Admin</SelectItem>

          <SelectItem value="DOCTOR">Doctor</SelectItem>

          <SelectItem value="NURSE">Nurse</SelectItem>

          <SelectItem value="STAFF">Staff</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
