"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import type { FooterMessage } from "@prisma/client";
import { createFooterMessage, updateFooterMessage } from "../footer-message.actions";

const schema = z.object({
  title: z.string().optional().nullable(),
  message: z.string().min(1, "กรุณากรอกข้อความ"),
  isActive: z.boolean(),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof schema>;

interface FooterMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: FooterMessage | null;
  onSuccess?: () => void;
}

function toInputDatetime(date: Date | null | undefined): string {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

export function FooterMessageDialog({
  open,
  onOpenChange,
  editItem,
  onSuccess,
}: FooterMessageDialogProps) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!editItem;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      title: editItem?.title ?? "",
      message: editItem?.message ?? "",
      isActive: editItem?.isActive ?? true,
      startAt: toInputDatetime(editItem?.startAt),
      endAt: toInputDatetime(editItem?.endAt),
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = isEdit
        ? await updateFooterMessage(editItem!.id, values)
        : await createFooterMessage(values);

      if (result.success) {
        toast.success(isEdit ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ");
        onOpenChange(false);
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.error ?? "เกิดข้อผิดพลาด");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            {isEdit ? "แก้ไข Footer Text" : "เพิ่ม Footer Text"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ (ไม่บังคับ)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ชื่อหัวข้อ"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ข้อความ *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="กรอกข้อความ footer..."
                      rows={4}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เริ่มต้น</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สิ้นสุด</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* isActive */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <FormLabel className="cursor-pointer">เปิดใช้งาน</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                ยกเลิก
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "บันทึก" : "เพิ่ม"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}