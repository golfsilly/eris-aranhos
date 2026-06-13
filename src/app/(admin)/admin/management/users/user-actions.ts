"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import * as betterAuthCrypto from 'better-auth/crypto';


import {
  createUserSchema,
  UpdateUserInput,
} from "./schema";

interface ResetPasswordInput {
  userId: string;
  password: string;
}


export async function createUser(
  values: unknown
) {
  const data =
    createUserSchema.parse(values);

  const result =
    await auth.api.signUpEmail({
      body: {
        email: data.email,

        password: data.password,

        username: data.username,

        firstName: data.firstName,

        lastName: data.lastName,

        name: `${data.firstName} ${data.lastName}`,

        displayUsername: `${data.firstName} ${data.lastName}`,
      },
    });

  await prisma.user.update({
    where: {
      email: data.email,
    },

    data: {
      role: data.role,
    },
  });

  revalidatePath("/admin/users");

  return result;
}

export async function updateUser(
  values: UpdateUserInput
) {
  await prisma.user.update({
    where: {
      id: values.id,
    },

    data: {
      username: values.username,

      email: values.email,

      firstName: values.firstName,
      lastName: values.lastName,

      name:
        `${values.firstName} ${values.lastName}`,

      displayUsername:
        `${values.firstName} ${values.lastName}`,

      role: values.role,

      isActive: values.isActive,
    },
  });

  revalidatePath("/admin/users");
}

export async function disableUser(
  userId: string
) {
  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    }),

    prisma.session.deleteMany({
      where: {
        userId,
      },
    }),
  ]);

  revalidatePath(
    "/admin/management/users"
  );
}

export async function enableUser(
  userId: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: true,
    },
  });

  revalidatePath(
    "/admin/management/users"
  );
}

export async function resetPassword(data: ResetPasswordInput) {
  const { userId, password } = data;
  const hashedPassword = await betterAuthCrypto.hashPassword(password);

  const account = await prisma.account.findFirst({
    where: {
      userId,
      providerId: 'credential',
    },
  });

  if (!account) throw new Error('ไม่พบบัญชี');

  await prisma.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: account.id },
      data: { password: hashedPassword },
    });

    // ลบ session เก่าทั้งหมด (บังคับให้ login ใหม่)
    await tx.session.deleteMany({
      where: { userId },
    });
  });

  return { success: true, message: 'รีเซ็ตรหัสผ่านสำเร็จ' };
}

export async function forceLogoutUser(
  userId: string
) {
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });

  revalidatePath(
    "/admin/management/users"
  );
}



