import { Prisma } from "@prisma/client";

export type UserRow =
  Prisma.UserGetPayload<{
    select: {
      id: true;
      username: true;
      email: true;

      firstName: true;
      lastName: true;

      image: true;

      role: true;

      isActive: true;
      emailVerified: true;

      createdAt: true;
    };
  }>;