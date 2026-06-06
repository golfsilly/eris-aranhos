"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";

const SignUpActionSchema = z
  .object({
    firstName: z.string().min(2, "กรุณากรอกชื่อ"),
    lastName: z.string().min(2, "กรุณากรอกนามสกุล"),
    email: z.email("อีเมลไม่ถูกต้อง"),
    username: z.string().min(3, "กรุณากรอกชื่อผู้ใช้"),
    password: z.string().min(3, "รหัสผ่านต้องมีอย่างน้อย 3 ตัวอักษร"),
    confirmPassword: z.string().min(3, "กรุณายืนยันรหัสผ่าน"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type SignUpActionValues = z.infer<typeof SignUpActionSchema>;

export async function signUpUser(values: SignUpActionValues) {
  try {
    const parsed = SignUpActionSchema.parse(values);

    const result = await auth.api.signUpEmail({
      body: {
        email: parsed.email,
        password: parsed.password,
        username: parsed.username,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        name: `${parsed.firstName} ${parsed.lastName}`,
        displayUsername: `${parsed.firstName} ${parsed.lastName}`,
      },
      headers: await headers(),
    });

    return result;
} catch (error) {
  console.error("SIGNUP ERROR");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  throw error;
}
}
