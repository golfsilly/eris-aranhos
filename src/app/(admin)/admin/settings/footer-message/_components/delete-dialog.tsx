"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import { deleteFooterMessage } from "../footer-message.actions";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title?: string | null;
  onSuccess?: () => void;
}

export function DeleteDialog({
  open,
  onOpenChange,
  id,
  title,
  onSuccess,
}: DeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteFooterMessage(id);
      if (result.success) {
        toast.success("ลบสำเร็จ");
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.error ?? "เกิดข้อผิดพลาด");
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
          <AlertDialogDescription>
            คุณต้องการลบ{" "}
            <span className="font-medium text-foreground">
              &quot;{title ?? "รายการนี้"}&quot;
            </span>{" "}
            ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            ลบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}