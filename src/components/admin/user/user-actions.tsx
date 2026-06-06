// user-actions.tsx

"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { EditUserDialog } from "./edit-user-dialog";
import { ResetPasswordDialog } from "./reset-password-dialog";
import { UserTableRow } from "./user-columns";
import {
  disableUser,
  enableUser,
  forceLogoutUser,
} from "@/app/(admin)/admin/management/users/user-actions";
import { toast } from "sonner";

interface Props {
  user: UserTableRow;
}

export function UserActions({ user }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const [resetOpen, setResetOpen] = useState(false);

  const handleForceLogout = async () => {
    await forceLogoutUser(user.id);

    toast.success("Logout ทุกอุปกรณ์สำเร็จ");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            แก้ไขข้อมูล
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setResetOpen(true)}>
            Reset Password
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleForceLogout}>
            Logout ทุกอุปกรณ์
          </DropdownMenuItem>
          {user.isActive ? (
            <DropdownMenuItem
              onClick={async () => {
                await disableUser(user.id);
              }}
            >
              Disable User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={async () => {
                await enableUser(user.id);
              }}
            >
              Enable User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditUserDialog open={editOpen} onOpenChange={setEditOpen} user={user} />

      <ResetPasswordDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        user={user}
      />
    </>
  );
}
