"use client";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signUpUser(data);

      router.refresh();

      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Create your account
                </h1>

                <p className="text-muted-foreground text-balance">
                  Enter your information to create a new account
                </p>
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Username
                </Label>

                <Input
                  id="username"
                  autoComplete="off"
                  disabled={isSubmitting}
                  {...register("username")}
                />

                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* First Name + Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">
                    First Name
                  </Label>

                  <Input
                    id="firstName"
                    autoComplete="off"
                    disabled={isSubmitting}
                    {...register("firstName")}
                  />

                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">
                    Last Name
                  </Label>

                  <Input
                    id="lastName"
                    autoComplete="off"
                    disabled={isSubmitting}
                    {...register("lastName")}
                  />

                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="off"
                  disabled={isSubmitting}
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  autoComplete="off"
                  disabled={isSubmitting}
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="off"
                  disabled={isSubmitting}
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Create Account
              </Button>
            </div>
          </form>

          {/* Hero Image */}
          <div className="bg-muted relative hidden md:block">
            {/* Light Mode */}
            <Image
              src="/images/auth/signup/hero-signup.jpg"
              alt="Sign Up"
              fill
              priority
              sizes="50vw"
              className="object-cover dark:hidden"
            />

            {/* Dark Mode */}
            <Image
              src="/images/auth/signup/hero-signup.jpg"
              alt="Sign Up"
              fill
              priority
              sizes="50vw"
              className="hidden object-cover dark:block"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}