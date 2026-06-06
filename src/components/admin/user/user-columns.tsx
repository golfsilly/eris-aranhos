"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRole } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActions } from "./user-actions";
import { RoleBadge } from "./role-badge";
import { StatusBadge } from "./active-badge";

export interface UserTableRow {
  id: string;
  username: string;
  email: string;

  firstName: string;
  lastName: string;

  image: string | null;

  role: UserRole;

  isActive: boolean;

  emailVerified: boolean;

  createdAt: Date;
}

export const columns: ColumnDef<UserTableRow>[] = [
  {
    accessorKey: "firstName",
    header: "ผู้ใช้งาน",

    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image ?? ""} />

            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "role",
    header: "Role",

    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },

  {
    accessorKey: "isActive",
    header: "สถานะ",

    cell: ({ row }) => <StatusBadge isActive={row.original.isActive} />,
  },

  {
    id: "actions",

    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
