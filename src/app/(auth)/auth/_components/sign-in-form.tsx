"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const signinSchema = z.object({
  identifier: z.string().min(3, "กรุณากรอกอีเมลหรือชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

type SignInFormValues = z.infer<typeof signinSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier);

      let result;

      if (isEmail) {
        result = await authClient.signIn.email({
          email: data.identifier,
          password: data.password,
          callbackURL: "/dashboard",
        });
      } else {
        result = await authClient.signIn.username({
          username: data.identifier,
          password: data.password,
          callbackURL: "/dashboard",
        });
      }

      if (result.error) {
        setError(result.error.message || "อีเมล/ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-foreground">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email or username
        </p>
      </div>

      <div className="grid gap-6">
        {/* Identifier */}
        <div className="grid gap-2">
          <Label htmlFor="identifier">Email or Username</Label>
          <Input
            id="identifier"
            type="text"
            {...form.register("identifier")}
            disabled={isLoading}
            className="bg-background"
          />
          {form.formState.errors.identifier && (
            <p className="text-sm text-destructive">
              {form.formState.errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm underline-offset-4 hover:underline text-muted-foreground"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            disabled={isLoading}
            className="bg-background"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Global Error */}
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4 hover:text-foreground">
          Sign up
        </Link>
      </div>
    </form>
  );
}