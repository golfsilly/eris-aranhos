"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { UserRole } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";

// import {
//   updateUserSchema,
//   type UpdateUserInput,
// } from "@/app/admin/users/user-schema";
import { updateUser } from "@/app/(admin)/admin/management/users/user-actions";
import { UpdateUserInput, updateUserSchema } from "@/app/(admin)/admin/management/users/schema";



interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  user: {
    id: string;

    username: string;
    email: string;

    firstName: string;
    lastName: string;

    role: UserRole;

    isActive: boolean;
  };
}

export function EditUserDialog({
  open,
  onOpenChange,
  user,
}: EditUserDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const form =
    useForm<UpdateUserInput>({
      resolver:
        zodResolver(updateUserSchema),

      defaultValues: {
        id: "",

        username: "",
        email: "",

        firstName: "",
        lastName: "",

        role: UserRole.STAFF,

        isActive: true,
      },
    });

  useEffect(() => {
    if (!user) return;

    form.reset({
      id: user.id,

      username: user.username,
      email: user.email,

      firstName: user.firstName,
      lastName: user.lastName,

      role: user.role,

      isActive: user.isActive,
    });
  }, [user, form]);

  const onSubmit = (
    values: UpdateUserInput
  ) => {
    startTransition(async () => {
      try {
        await updateUser(values);

        toast.success(
          "บันทึกข้อมูลสำเร็จ"
        );

        onOpenChange(false);
      } catch (error) {
        console.error(error);

        toast.error(
          "ไม่สามารถบันทึกข้อมูลได้"
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            แก้ไขผู้ใช้งาน
          </DialogTitle>

          <DialogDescription>
            แก้ไขข้อมูลและสิทธิ์การใช้งาน
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ชื่อ
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      นามสกุล
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role
                  </FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={
                      field.onChange
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ADMIN">
                        ADMIN
                      </SelectItem>

                      <SelectItem value="DOCTOR">
                        DOCTOR
                      </SelectItem>

                      <SelectItem value="NURSE">
                        NURSE
                      </SelectItem>

                      <SelectItem value="STAFF">
                        STAFF
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel>
                      เปิดใช้งาน
                    </FormLabel>

                    <p className="text-sm text-muted-foreground">
                      อนุญาตให้เข้าสู่ระบบ
                    </p>
                  </div>

                  <FormControl>
                    <Switch
                      checked={
                        field.value
                      }
                      onCheckedChange={
                        field.onChange
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                ยกเลิก
              </Button>

              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending
                  ? "กำลังบันทึก..."
                  : "บันทึก"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}