import { prisma } from "@/lib/prisma";

const logs =
  await prisma.auditLog.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 50,
  });