"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, UserRole } from "@prisma/client";

interface GetUsersOptions {
  page: number;
  pageSize: number;
  search?: string;
  role?: UserRole;
}

export async function getUsers({
  page,
  pageSize,
  search,
  role,
}: GetUsersOptions) {
  const where: Prisma.UserWhereInput = {
    ...(role && {
      role,
    }),

    ...(search && {
      OR: [
        {
          username: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * pageSize,

      take: pageSize,

      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        image: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
      },
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    data: users,

    pagination: {
      page,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize),
    },
  };
}
