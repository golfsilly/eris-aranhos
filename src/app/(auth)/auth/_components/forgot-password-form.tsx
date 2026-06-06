"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MailCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client"; // 🟢 ปรับพาธไปหา authClient ของคุณ
import { forgotPasswordSchema, type ForgotPasswordValues } from "./schema";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.$fetch("/forget-password", {
        method: "POST",
        body: {
          email: data.email,
          callbackURL: "/auth/reset-password", 
        },
      });

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "เกิดข้อผิดพลาด ระบบไม่สามารถส่งลิงก์รีเซ็ตรหัสผ่านได้");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎉 UI แสดงเมื่อส่งลิงก์ไปที่อีเมลสำเร็จ (Success View)
  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="border-green-100 bg-green-50/30">
          <CardContent className="pt-8 text-center flex flex-col items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600 animate-bounce">
              <MailCheck className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl text-green-800">
              Check your email
            </CardTitle>
            <CardDescription className="text-balance max-w-sm">
              เราได้ส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปที่{" "}
              <span className="font-semibold text-foreground">
                {submittedEmail}
              </span>{" "}
              เรียบร้อยแล้ว กรุณาตรวจสอบในกล่องจดหมายของคุณ (รวมถึง Junk/Spam)
            </CardDescription>

            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Try another email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 📝 UI ฟอร์มกรอกอีเมลปกติ
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            ระบุอีเมลของคุณที่ใช้ในระบบ
            เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้ทางอีเมล
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...form.register("email")}
                    disabled={isLoading}
                    className={cn(
                      form.formState.errors.email &&
                        "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* 🔴 กล่องแสดงข้อผิดพลาด */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send Reset Link
                </Button>
              </div>

              <div className="text-center text-sm border-t pt-4">
                Remember your password?{" "}
                <a
                  href="/auth/signin"
                  className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
                >
                  Back to sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
