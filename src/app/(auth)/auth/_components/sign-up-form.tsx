"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signUpUser } from "./actions";
import { SignUpFormValues, SignUpSchema } from "./schema";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
  
      await signUpUser(data);

      router.refresh();

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push("/dashboard");


    } catch (err: any) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* ... ส่วน Logo และหัวข้อเหมือนเดิม ... */}

              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your information to create a new account
                </p>
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  autoComplete="off"
                  {...form.register("username")}
                  disabled={isLoading}
                />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...form.register("firstName")}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...form.register("lastName")}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  autoComplete="off"
                  disabled={isLoading}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  autoComplete="off"
                  disabled={isLoading}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...form.register("confirmPassword")}
                  autoComplete="off"
                  disabled={isLoading}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </div>
          </form>

          {/* ภาพด้านขวา */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/auth/signup/hero-signup.jpg"
              alt="Sign up background"
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
