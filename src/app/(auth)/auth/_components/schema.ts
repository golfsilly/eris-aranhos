import { z } from "zod";

export const signinSchema = z.object({
  identifier: z.string().min(3, "กรุณากรอกอีเมลหรือชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export type SignInFormValues = z.infer<typeof signinSchema>;

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username ต้องมีอย่างน้อย 3 ตัวอักษร")
      .max(30, "Username ไม่เกิน 30 ตัวอักษร")
      .regex(/^[a-zA-Z0-9._-]+$/, "Username ใช้ได้เฉพาะ a-z, 0-9, ., _, -"),

    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    email: z.email("อีเมลไม่ถูกต้อง"),
    password: z.string().min(3, "รหัสผ่านต้องมีอย่างน้อย 3 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;


export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "กรุณากรอกอีเมล")
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;