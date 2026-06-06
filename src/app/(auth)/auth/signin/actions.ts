"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function signInUser(
  identifier: string,
  password: string
) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier },
      ],
    },
    select: {
      email: true,
    },
  });

  if (!user) {
    throw new Error("ไม่พบผู้ใช้งาน");
  }

  return auth.api.signInEmail({
    body: {
      email: user.email,
      password,
    },
  });
}